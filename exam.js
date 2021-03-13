const date1 = new Date('2021-03-13 18:00:00');
const date2 = new Date();

const diff = date1.getTime() - date2.getTime();


console.log('=================================');
console.log('date1? : ', date1);
console.log('date2? : ', date2);
console.log('date1.getTime()? : ', date1.getTime());
console.log('date2.getTime()? : ', date2.getTime());
console.log('diff? : ', diff);
console.log('diff / (60*60*1000)? : ', diff / (60*60*1000)); 
console.log('Math.abs(diff) / (60*60*1000)? : ', Math.abs(diff) / (60*60*1000));


// ==========================
// message? どーなつナシ
// createdAt?     1615638673
// timestampData? 1615638673396
// ==========================
// ==========================
// message? どーなつアリ
// createdAt?     1615638685
// timestampData? 1615638685164
// ==========================
// ↑つまり、createdAtのデータの差分を (60*60)で割れば、時間が出る？