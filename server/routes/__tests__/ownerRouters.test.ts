import {
  expect,
  it,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
  afterEach,
} from 'vitest'
import request from 'supertest'

import connection from '../../db/connection.ts'
import * as db from '../../db/functions/pets.ts'
import server from '../../server.ts'
