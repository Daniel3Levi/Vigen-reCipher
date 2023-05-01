//https://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3/train/javascript

function VigenèreCipher(key, abc) {
  abc = abc.split('');
  abcSpecial = [];

  const isSpecial = (char) => {
    let flag = abcSpecial.indexOf(char) !== -1;
    return flag;
  };

  const hasSpace = (str) => {
    return str.indexOf(' ') >= 0;
  };

  const validStr = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (abc.indexOf(str[i]) == -1) {
        abcSpecial.push(str[i]);
      }
    }
  };

  const keyIndex = (key, i) => {
    if (i < key.length - 1) {
      i++;
    } else {
      i = 0;
    }
    return i;
  };

  const createBord = (alfabit) => {
    alfabit_len = alfabit.length;
    let bord = [];
    for (let y = 0; y < alfabit_len; y++) {
      let row = [];
      for (let x = 0; x < alfabit_len; x++) {
        row.push(alfabit[x]);
      }
      let start = alfabit.shift();
      alfabit.push(start);
      bord.push(row);
    }

    return bord;
  };

  const current_bord = createBord(abc);

  this.encode = function (str) {
    validStr(str);
    let key_index = 0;

    const _encode = (str) => {
      let result = '';

      let x_bord = current_bord[0];
      console.table(current_bord);

      for (let i = 0; i < str.length; i++) {
        if (isSpecial(str[i])) {
          result += str[i];
          key_index = keyIndex(key, key_index);
          continue;
        } else {
          let x = x_bord.indexOf(str[i]);

          let y;

          for (let j = 0; j < current_bord.length; j++) {
            let row = current_bord[j];
            if (row[0] == key[key_index]) {
              y = j;
              break;
            }
          }
          key_index = keyIndex(key, key_index);
          result += current_bord[x][y];
        }
      }
      return result;
    };

    let encoded;

    if (hasSpace(str)) {
      str = str.split(' ');

      for (let i = 0; i < str.length; i++) {
        str[i] = _encode(str[i]);
        key_index++;
      }
      console.log(str);
      encoded = str.join(' ');
    } else {
      encoded = _encode(str);
    }

    return encoded;
  };

  this.decode = function (str) {
    validStr(str);

    let decoded;
    let key_index = 0;

    const _decode = (str) => {
      let result = '';
      let key_x;

      for (let i = 0; i < str.length; i++) {
        if (isSpecial(str[i])) {
          result += str[i];
          key_index = keyIndex(key, key_index);
        } else {
          for (let j = 0; j < current_bord.length; j++) {
            let row = current_bord[j];
            if (key[key_index] == row[0]) {
              key_x = row.indexOf(str[i]);
              break;
            }
          }

          let first_row = current_bord[0];
          result += first_row[key_x];

          key_index = keyIndex(key, key_index);
        }
      }

      return result;
    };

    if (hasSpace(str)) {
      str = str.split(' ');
      for (let i = 0; i < str.length; i++) {
        str[i] = _decode(str[i]);
        key_index++;
      }
      decoded = str.join(' ');
    } else {
      decoded = _decode(str);
    }

    return decoded;
  };
}

let test = new VigenèreCipher(
  'カタカナ',
  'アイウエオァィゥェォカキクケコサシスセソタチツッテトナニヌネノハヒフヘホマミムメモヤャユュヨョラリルレロワヲンー'
);
//console.log(test.encode(`ドモアリガトゴザイマス`)); //ドオカセガヨゴザキアニ
console.log(test.decode(`ドオカセガヨゴザキアニ`));
