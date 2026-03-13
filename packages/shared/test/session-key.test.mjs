import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildSessionKey,
  parseTaskIdFromSessionKey,
} from '../dist/constants.js';

test('parseTaskIdFromSessionKey parses current ClawWork session keys', () => {
  const taskId = 'task-current';
  const sessionKey = buildSessionKey(taskId);

  assert.equal(parseTaskIdFromSessionKey(sessionKey), taskId);
});

test('parseTaskIdFromSessionKey keeps accepting legacy task session keys', () => {
  assert.equal(parseTaskIdFromSessionKey('agent:main:task-task-legacy'), 'task-legacy');
});
