import { useState, useEffect, useMemo } from 'react';
import type { GatewayInfo } from '@clawwork/core';
import type { AgentInfo } from '@clawwork/shared';

interface UseGatewaySelectorProps {
  defaultGatewayId?: string | null;
  gateways: GatewayInfo[];
  fetchAgentsForGateway: (gatewayId: string) => Promise<void>;
  agentCatalogByGateway: Record<string, { agents: AgentInfo[]; defaultId: string }>;
}

export function useGatewaySelector({
  defaultGatewayId,
  gateways,
  fetchAgentsForGateway,
  agentCatalogByGateway,
}: UseGatewaySelectorProps) {
  const [selectedGwId, setSelectedGwId] = useState<string>(defaultGatewayId || '');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const gwAgents = selectedGwId ? agentCatalogByGateway[selectedGwId] : null;
  const agentCatalog = useMemo(() => gwAgents?.agents ?? [], [gwAgents]);
  const effectiveAgentId = selectedAgentId || gwAgents?.defaultId || '';

  useEffect(() => {
    if (!selectedGwId && gateways.length > 0) {
      setSelectedGwId(gateways[0].id);
    }
  }, [gateways, selectedGwId]);

  useEffect(() => {
    if (selectedGwId) {
      fetchAgentsForGateway(selectedGwId);
    }
  }, [selectedGwId, fetchAgentsForGateway]);

  const hasMultipleGw = gateways.length > 1;
  const hasMultipleAgents = agentCatalog.length > 1;

  return {
    selectedGwId,
    setSelectedGwId,
    agentCatalog,
    effectiveAgentId,
    setSelectedAgentId,
    hasMultipleGw,
    hasMultipleAgents,
    gwAgents,
  };
}
