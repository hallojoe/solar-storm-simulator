import {test} from 'node:test';
import assert from 'node:assert/strict';
import {distance,arrival,earthHit,speedAt,presets,severity} from './model.js';
test('drag solution starts at zero and reaches one AU at computed arrival',()=>{for(const speed of [300,400,750,2200]){assert.equal(distance(0,speed,400),0);assert.ok(Math.abs(distance(arrival(speed,400),speed,400)-1)<1e-10);assert.ok(distance(24,speed,400)<distance(48,speed,400));}});
test('drag approaches wind from either side without overshooting',()=>{assert.ok(speedAt(50,2200,400)>400);assert.ok(speedAt(50,2200,400)<2200);assert.ok(speedAt(50,300,400)>300);assert.ok(speedAt(50,300,400)<400);assert.equal(speedAt(10,400,400),400);});
test('cone includes latitude and longitude and identifies misses',()=>{assert.ok(earthHit(presets.moderate));assert.ok(!earthHit(presets.miss));assert.ok(!earthHit({...presets.moderate,latitude:60}));assert.equal(severity(presets.miss),'Off target');assert.equal(severity({...presets.extreme,bz:20}),'Low');});
