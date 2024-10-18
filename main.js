import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optionalv
const firebaseConfig = {
  apiKey: "AIzaSyCLd1WDA9uF77_Oqn1YRm-1exSf7KBdLSo",
  authDomain: "ibrahim-af5f3.firebaseapp.com",
  projectId: "ibrahim-af5f3",
  storageBucket: "ibrahim-af5f3.appspot.com",
  messagingSenderId: "65867278858",
  appId: "1:65867278858:web:9bdaab0c0b44dbf14a8df3",
  measurementId: "G-TN3BT5MZJR"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarBarang() {
  const refDokumen = collection(db, "pkl");
  const kueri = query(refDokumen, orderBy("namaBarang"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      tanggalMasuk: dok.data(). tanggalMasuk,
      namaBarang: dok.data(). namaBarang,
      jumlahBarang: dok.data(). jumlahBarang
    });
  });


  return hasil
}

export async function tambahBarang(tanggalMasuk, namaBarang, jumlahBarang,) {
  try {
    const dokRef = await addDoc(collection(db, 'pkl'), {
      tanggalMasuk: tanggalMasuk,
      namaBarang: namaBarang,
      jumlahBarang: jumlahBarang
    });
    console.log('berhasil menembah Barang ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah Barang' + e);
  }
}


//fungsi untuk hapus data
export async function hapusBarang(docId) {
  await deleteDoc(doc(db, "pkl", docId));
}
//fungsi untuk ubah data
export async function ubahBarang(docId, tanggalMasuk, namaBarang, jumlahBarang ) {
  await updateDoc(doc(db, "pkl", docId), {
    tanggalMasuk: tanggalMasuk,
    namaBarang: namaBarang,
    jumlahBarang: jumlahBarang,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilBarang(docId) {
  const docRef = await doc(db, "pkl", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}