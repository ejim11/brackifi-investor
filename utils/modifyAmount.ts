const modifyNum = (num: string) => {
  if (num.length < 4) {
    return num;
  }
  if (num.length === 4) {
    return num[0] + ',' + num.slice(1);
  }
  if (num.length === 5) {
    return num.slice(0, 2) + ',' + num.slice(2);
  }
  if (num.length === 6) {
    return num.slice(0, 3) + ',' + num.slice(3);
  }
  if (num.length === 7) {
    return num[0] + ',' + num.slice(1, 4) + ',' + num.slice(4);
  }
  if (num.length === 8) {
    return num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5);
  }
  if (num.length === 9) {
    return num.slice(0, 3) + ',' + num.slice(3, 6) + ',' + num.slice(6);
  }
  if (num.length === 10) {
    return (
      num[0] +
      ',' +
      num.slice(1, 4) +
      ',' +
      num.slice(4, 7) +
      ',' +
      num.slice(7)
    );
  }
};

export default modifyNum;
