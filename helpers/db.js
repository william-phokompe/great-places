import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = (_) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (   
            id INTEGER PRIMARY KEY NOT NULL, 
            title TEXT NOT NULL, 
            imageUri TEXT NOT NULL, 
            address TEXT NOT NULL, 
            latitude REAL NOT NULL, 
            longitude REAL NOT NULL
        );`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUri, address, lat, long) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO places (
            title, imageUri, address, latitude, longitude
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [title, imageUri, address, lat, long],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT * FROM places 
        `,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
