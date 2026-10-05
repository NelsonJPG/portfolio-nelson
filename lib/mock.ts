// Generated placeholder screenshots (SVG data URIs) until real screenshots are added.
export type MockKind = "dashboard" | "calendar" | "gallery" | "workflow" | "site" | "map" | "form" | "components";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function mock(kind: MockKind, label: string): string {
  const W = 800, H = 500;
  let b = "";
  const R = (x: number, y: number, w: number, h: number, f: string, r = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"/>`;
  const T = (x: number, y: number, s: number, t: string, f = "#a3a3a3", a = "start") =>
    `<text x="${x}" y="${y}" font-size="${s}" fill="${f}" text-anchor="${a}" font-family="ui-monospace,Menlo,monospace">${esc(t)}</text>`;
    b+=R(0,0,W,H,'#111',0)+R(0,0,W,36,'#181818',0);
    b+=`<circle cx="20" cy="18" r="5" fill="#3a3a3a"/><circle cx="38" cy="18" r="5" fill="#3a3a3a"/><circle cx="56" cy="18" r="5" fill="#3a3a3a"/>`;
    b+=R(220,9,360,18,'#222',9)+T(400,22,11,label,'#6f6f6f','middle');
    const side=()=>{let s=R(0,36,150,H-36,'#141414',0);for(let i=0;i<7;i++)s+=R(18,62+i*34,i===1?110:80+(i*13)%40,12,i===1?'#ededed':'#2e2e2e',4);return s};
    if(kind==='dashboard'){b+=side();for(let i=0;i<3;i++){b+=R(170+i*205,56,190,86,'#1a1a1a',10)+R(186+i*205,74,60,8,'#3a3a3a',4)+R(186+i*205,96,90,22,i?'#8a8a8a':'#ededed',4)}
      b+=R(170,158,400,320,'#1a1a1a',10);let p='M190 440';for(let i=0;i<=12;i++)p+=` L${190+i*30} ${430-Math.sin(i*.8)*50-i*14}`;b+=`<path d="${p}" fill="none" stroke="#ededed" stroke-width="3"/>`;
      b+=R(580,158,200,320,'#1a1a1a',10);for(let i=0;i<6;i++)b+=R(596,180+i*48,168,34,'#222',6)+R(606,192+i*48,70,10,'#4a4a4a',4)}
    else if(kind==='calendar'){b+=side();b+=T(170,74,20,'October','#ededed');for(let r=0;r<5;r++)for(let c=0;c<7;c++){const x=170+c*87,y=96+r*78;b+=R(x,y,81,72,'#181818',6)+T(x+8,y+18,11,String(r*7+c+1),'#6f6f6f');if((r*7+c)%5===2)b+=R(x+6,y+30,69,14,'#ededed',4);if((r*7+c)%7===4)b+=R(x+6,y+48,52,14,'#4a4a4a',4)}}
    else if(kind==='gallery'){b+=side();for(let r=0;r<3;r++)for(let c=0;c<4;c++){const x=170+c*152,y=56+r*146,g=['#2a2a2a','#3a3a3a','#1f1f1f','#4a4a4a'][(r+c)%4];b+=R(x,y,140,134,g,10)+`<circle cx="${x+100}" cy="${y+40}" r="14" fill="#6f6f6f"/><path d="M${x+10} ${y+124} L${x+60} ${y+70} L${x+100} ${y+110} L${x+130} ${y+86} L${x+130} ${y+124}Z" fill="#555"/>`}}
    else if(kind==='workflow'){b+=side();const nodes: number[][]=[[200,90],[420,90],[420,230],[640,230],[200,370],[420,370]];b+=`<g stroke="#4a4a4a" stroke-width="2" fill="none"><path d="M330 115 H420"/><path d="M485 140 V230"/><path d="M550 255 H640"/><path d="M485 280 V330 H265 V370"/><path d="M330 395 H420"/></g>`;nodes.forEach(([x,y]: number[],i: number)=>{b+=R(x,y,130,50,i===2?'#ededed':'#1c1c1c',10)+R(x+14,y+14,i===2?80:70,8,i===2?'#111':'#4a4a4a',4)+R(x+14,y+30,50,6,i===2?'#555':'#2e2e2e',3)})}
    else if(kind==='site'){b+=R(40,56,720,34,'#161616',8);for(let i=0;i<4;i++)b+=R(430+i*80,68,56,10,'#3a3a3a',4);b+=R(40,56,90,34,'#161616',0)+R(56,68,60,10,'#ededed',4);
      b+=R(40,118,420,30,'#ededed',6)+R(40,158,340,30,'#ededed',6)+R(40,206,300,10,'#4a4a4a',4)+R(40,224,260,10,'#4a4a4a',4)+R(40,258,130,40,'#ededed',8)+R(490,112,270,200,'#1f1f1f',12);for(let i=0;i<3;i++)b+=R(40+i*244,330,228,140,'#181818',10)+R(56+i*244,350,110,10,'#8a8a8a',4)+R(56+i*244,372,180,8,'#3a3a3a',4)}
    else if(kind==='map'){b+=side();b+=R(170,56,400,420,'#1a1a1a',10);for(let i=0;i<9;i++)b+=`<path d="M170 ${80+i*48} Q370 ${60+i*52} 570 ${90+i*44}" stroke="#262626" stroke-width="${i%3?2:6}" fill="none"/>`;[[300,200],[420,300],[250,360]].forEach(([x,y]: number[],i: number)=>b+=`<circle cx="${x}" cy="${y}" r="${i?9:13}" fill="${i?'#8a8a8a':'#ededed'}"/>`);b+=R(590,56,190,420,'#1a1a1a',10);for(let i=0;i<5;i++)b+=R(606,76+i*78,158,62,'#222',8)+R(618,90+i*78,90,9,'#6f6f6f',4)+R(618,108+i*78,120,7,'#3a3a3a',3)}
    else if(kind==='form'){b+=side();b+=R(170,56,360,420,'#1a1a1a',10);for(let i=0;i<5;i++)b+=R(190,80+i*70,120,8,'#6f6f6f',4)+R(190,96+i*70,320,34,'#222',6);b+=R(190,436,140,30,'#ededed',6);b+=R(550,56,230,240,'#ededed',10)+R(570,80,100,10,'#6f6f6f',4)+R(570,104,150,28,'#111',6)+R(570,150,190,8,'#8a8a8a',4)+R(570,170,160,8,'#8a8a8a',4)+R(570,190,170,8,'#8a8a8a',4)}
    else if(kind==='components'){b+=T(40,140,12,'Buttons','#6f6f6f');([['#ededed',120],['#222',120],['#1a1a1a',120]] as [string,number][]).forEach(([f,w]: [string,number],i: number)=>b+=R(40+i*140,154,w,40,f,8));b+=T(40,236,12,'Inputs','#6f6f6f')+R(40,250,340,40,'#1a1a1a',8)+R(400,250,360,40,'#1a1a1a',8);
      b+=T(40,332,12,'Tokens','#6f6f6f');['#0a0a0a','#121212','#1a1a1a','#262626','#3a3a3a','#6f6f6f','#a3a3a3','#ededed'].forEach((f: string,i: number)=>b+=R(40+i*90,346,78,60,f,8)+`<rect x="${40+i*90}" y="346" width="78" height="60" rx="8" fill="none" stroke="#333"/>`);b+=T(40,94,22,'Design system','#ededed')+T(760,94,12,'v2.4','#6f6f6f','end')}
    b+=T(W-14,22,10,'PLACEHOLDER','#6f6f6f','end');
  return "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${b}</svg>`);
}
