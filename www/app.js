// This is a JavaScript file

(function() {
  // グローバルを汚染しないように、クロージャ内で宣言

  /**
   * DB作成
   */
  function openDb() {
    // データベース名、バージョン、表示名、サイズ
    return openDatabase('test', '1.0.0', 'Test Database', 1000);
  }

  var wsUtil = (function(dbfactory) {
    // DB作成
    var db = dbfactory();

    // パブリックな関数を定義
    return {
      /**
       * テーブル作成
       * @return {Promise}
       */
      init: function() {
        return new Promise(function(resolve, reject) {
          db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
          }, function(error) {
            reject(error.message);
          }, function() {
            console.log('init success');
            resolve();
          });
        });
      },
      /**
       * データ取込
       * @param {string} fileName - ファイルパス
       * @return {Promise}
       */
      import: function(filePath) {
        return new Promise(function(resolve, reject) {
          // ファイル読み込み
          var req = _getFile(filePath);

          req.onload = function() {
            // 2次元配列に変換する
            var csv = _convertToArray(req.responseText);
            db.transaction(function(tx) {
              for (var i = 0; i < csv.length; ++i) {
                if (csv[i][0] !== '') {
                  tx.executeSql('REPLACE INTO users VALUES (?, ?, ?)', csv[i]);
                }
              }
            }, function(error) {
              reject(error.message);
            }, function() {
              console.log('import success');
              resolve();
            });
          }
        });
      },
    }

    // プライべートな関数を定義

    /**
     * 文字列の 'null' を null に変換
     * @param {string} field
     * @retuen {(null|string)}
     */
    function _convertToNull(field) {
      if (undefined === field || (field !== undefined && field.toLowerCase() === 'null')) {
        return null;
      }

      return field;
    }

     /**
      * ファイルを読み込む
      * @param {string} fileName ファイルパス
      * @return {XMLHttpRequest} req.onload = function(){} で読み込み完了を判別する
      */
    function _getFile(fileName) {
      var req = new XMLHttpRequest();
      req.open('get', fileName, true);
      req.send(null);

      return req;
    }

     /**
      * カンマ区切りの文字列を2次元配列に変換する
      * @param {string} val 文字列
      * @return {Array}
     */
    function _convertToArray(val) {
      var result = [];
      // 改行コード区切りで各行の配列を生成
      var tmp = val.split('\n');

      // 各行の配列からカンマ区切りで配列を生成
      for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
        for (var j = 0; j < result[i].length; ++j) {
          result[i][j] = _convertToNull(result[i][j]);
        }
      }
      return result;
    }
  })(function() {
    // dbfactory
    return openDb();
  });

  // SQLite Database の初期化と CSVファイルの取り込み
  wsUtil.init().then(function() {
    // init の Promise が成功した場合に処理する
    wsUtil.import('C:\Users\Ryota Okunishi\OneDrive\test_Nihonshu.csv');
  })
})();