export const AU = 149597870.7;
export const presets = {
  moderate: {speed:750,width:60,longitude:0,latitude:0,bz:-8,wind:400},
  extreme: {speed:2200,width:110,longitude:0,latitude:0,bz:-35,wind:450},
  miss: {speed:1200,width:40,longitude:65,latitude:10,bz:-15,wind:400},
};
// Analytic solution to dv/dt = -gamma (v-w)|v-w|, with r in km and t in seconds.
export function distance(hours, speed, wind) {
  const t=Math.max(0,hours)*3600, d=speed-wind, gamma=1e-8;
  return (wind*t + Math.sign(d)*Math.log1p(gamma*Math.abs(d)*t)/gamma)/AU;
}
export function arrival(speed,wind) {let lo=0,hi=240;for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(distance(mid,speed,wind)<1)lo=mid;else hi=mid;}return (lo+hi)/2;}
export function earthHit(p) {const angle=Math.acos(Math.cos(p.latitude*Math.PI/180)*Math.cos(p.longitude*Math.PI/180))*180/Math.PI;return angle<=p.width/2;}
export function speedAt(hours,speed,wind) {const d=speed-wind;return wind+d/(1+1e-8*Math.abs(d)*Math.max(0,hours)*3600);}
export function severity(p) {if(!earthHit(p))return 'Off target';const coupling=speedAt(arrival(p.speed,p.wind),p.speed,p.wind)*Math.max(0,-p.bz);return coupling>18000?'Very high':coupling>8000?'High':coupling>2000?'Moderate':'Low';}
