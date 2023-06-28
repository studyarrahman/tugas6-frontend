<template>
<nav id="navbar-example2" class="navbar navbar-dark bg-dark px-3 mb-3 fixed-top">
  <a class="navbar-brand" href="#">CRUD OPERATION</a>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link btn btn-outline-warning text-white" href="/">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link btn btn-outline-warning text-white" href="/profile">Go to Profile</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle btn btn-outline-warning text-white" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Select Operation</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#operasibuku">Buku</a></li>
        <li><a class="dropdown-item" href="#operasikategori">Kategori</a></li>
      </ul>
    </li>
    
  </ul>
</nav>


<br id="operasibuku">
  <div class="container mt-5 ">
    <div class="mb-5">
      <h1 class="text-center" >CRUD Operation buku</h1>
      <hr />
    </div>
    <!-- Button trigger modal -->
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Tambah buku
      </button>
    </div>

    <!-- Modal Insert -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Data</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form enctype="multipart/form-data">
            <input class="form-control" type="text" v-model="insertKode" placeholder="kode" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertKodeKategori" placeholder="kode_kategori" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertJudul" placeholder="judul" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertPengarang" placeholder="pengarang" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertPenerbit" placeholder="penerbit" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertTahun" placeholder="tahun" aria-label="default input example" /><br />
            <input class="form-control" type="date" v-model="insertTanggalInput" placeholder="tanggal_input" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertHarga" placeholder="harga" aria-label="default input example" /><br />
            
            <div class="mb-3">
              <input class="form-control" type="file" ref="file" id="formFile" />
            </div>
          </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" v-on:click="postbuku()">Tambah buku</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="table-responsive">
      <table class="table border">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Kode</th>
            <th scope="col">Kode Kategori</th>
            <th scope="col">Judul</th>
            <th scope="col">Pengarang</th>
            <th scope="col">Penerbit</th>
            <th scope="col">Tahun</th>
            <th scope="col">Tanggal Input</th>
            <th scope="col">Harga</th>
            <th scope="col">Cover</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in paginatedBuku" :key="data.kode">
            <td>{{ (currentPageBuku - 1) * perPageBuku + index + 1 }}</td>
            <td>{{ data.kode }}</td>
            <td>{{ data.kode_kategori }}</td>
            <td>{{ data.judul }}</td>
            <td>{{ data.pengarang }}</td>
            <td>{{ data.penerbit }}</td>
            <td>{{ data.tahun }}</td>
            <td>{{ data.tanggal_input }}</td>
            <td>Rp.{{ data.harga }}</td>
            <td>
              <img :src="data.file_cover" alt="file_cover" style="max-width: 100px" />
            </td>
            <td>
              <router-link :to="{ name: 'updateBuku', params: { kode: data.kode } }" class="btn btn-warning me-3">Update</router-link>
              <button type="button" class="btn btn-danger" v-on:click="deletebuku(data.kode)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <nav aria-label="Paginasi Buku">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: currentPageBuku === 1 }">
      <button class="page-link" @click="paginateBuku(currentPageBuku - 1)" :disabled="currentPageBuku === 1">Previous</button>
    </li>
    <li class="page-item" v-for="pageBuku in totalPagesBuku" :key="pageBuku" :class="{ active: currentPageBuku === pageBuku }">
      <button class="page-link" @click="paginateBuku(pageBuku)">{{ pageBuku }}</button>
    </li>
    <li class="page-item" :class="{ disabled: currentPageBuku === totalPagesBuku }">
      <button class="page-link" @click="paginateBuku(currentPageBuku + 1)" :disabled="currentPageBuku === totalPagesBuku">Next</button>
    </li>
  </ul>
</nav>



<br id="operasikategori">
  <div class="container my-5">
    <div class="mb-5">
      <h1 class="text-center" >CRUD Operation Kategori</h1>
      <hr />
    </div>
    <!-- Button trigger modal -->
    <div class="d-flex justify-content-between">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Tambah Kategori
      </button>
    </div>

    <!-- Modal Insert -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Data</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input class="form-control" type="text" v-model="insertKode1" placeholder="kode" aria-label="default input example" /><br />
            <input class="form-control" type="text" v-model="insertKategori" placeholder="kategori" aria-label="default input example" /><br />
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="button" class="btn btn-primary" v-on:click="postkategori()">Tambah Kategori</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <div class="table-responsive">
      <table class="table border">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Kode</th>
            <th scope="col">Kategori</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in paginatedKategori" :key="data.kode">
            <td>{{ (currentPageKategori - 1) * perPageKategori + index + 1 }}</td>
            <td>{{ data.kode }}</td>
            <td>{{ data.kategori }}</td>
            <td>
              <router-link :to="{ name: 'updateKategori', params: { kode: data.kode } }" class="btn btn-warning me-3">Update</router-link>
              <button type="button" class="btn btn-danger" v-on:click="deletekategori(data.kode)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <nav aria-label="Paginasi Kategori">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{ disabled: currentPageKategori === 1 }">
      <button class="page-link" @click="paginateKategori(currentPageKategori - 1)" :disabled="currentPageKategori === 1">Previous</button>
    </li>
    <li class="page-item" v-for="pageKategori in totalPagesKategori" :key="pageKategori" :class="{ active: currentPageKategori === pageKategori }">
      <button class="page-link" @click="paginateKategori(pageKategori)">{{ pageKategori }}</button>
    </li>
    <li class="page-item" :class="{ disabled: currentPageKategori === totalPagesKategori }">
      <button class="page-link" @click="paginateKategori(currentPageKategori + 1)" :disabled="currentPageKategori === totalPagesKategori">Next</button>
    </li>
  </ul>
</nav>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const allBuku = 'http://localhost/library/selectallbuku.php';
const postApi = 'http://localhost/library/insertbuku.php';
const delAPI = 'http://localhost/library/deletebukubykode.php';

const allKategori = 'http://localhost/library/selectallkategori.php';
const postApi2 = 'http://localhost/library/insertkategori.php';
const delAPI2 = 'http://localhost/library/deletekategoribykode.php';

export default {
  data() {
    return {
      buku: ref([]),
      insertKode: '',
      insertKodeKategori: '',
      insertJudul: '',
      insertPengarang: '',
      insertPenerbit: '',
      insertTahun: '',
      insertTanggalInput: '',
      insertHarga: '',
      file: '',

      kategori: ref([]),
      insertKode1: '',
      insertKategori: '',

      currentPageBuku: 1,
      perPageBuku: 3,
      paginatedBuku: ref ([]),

      currentPageKategori: 1,
      perPageKategori: 5,
      paginatedKategori: ref ([]),
    };
  },

  mounted() {
    this.readData();
    this.readData2();
  },

  computed: {
  totalPagesBuku() {
    return Math.ceil(this.buku.length / this.perPageBuku);
  },
  totalPagesKategori() {
    return Math.ceil(this.kategori.length / this.perPageKategori);
  },
},

  methods: {
    paginateBuku(pageBuku) {
    const startIndex = (pageBuku - 1) * this.perPageBuku;
    const endIndex = startIndex + this.perPageBuku;
    this.paginatedBuku = this.buku.slice(startIndex, endIndex);
    this.currentPageBuku = pageBuku;
  },
    paginateKategori(pageKategori) {
    const startIndex = (pageKategori - 1) * this.perPageKategori;
    const endIndex = startIndex + this.perPageKategori;
    this.paginatedKategori = this.kategori.slice(startIndex, endIndex);
    this.currentPageKategori = pageKategori;
  },


    readData() {
      axios.get(allBuku)
        .then((resp) => {
          console.log(resp);
          this.buku = resp.data;
          this.paginateBuku(this.currentPageBuku);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    readData2() {
      axios.get(allKategori)
        .then((resp) => {
          console.log(resp);
          this.kategori = resp.data;
          this.paginateKategori(this.currentPageKategori);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    postbuku() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append('kode', this.insertKode);
      formData.append('kode_kategori', this.insertKodeKategori);
      formData.append('judul', this.insertJudul);
      formData.append('pengarang', this.insertPengarang);
      formData.append('penerbit', this.insertPenerbit);
      formData.append('tahun', this.insertTahun);
      formData.append('tanggal_input', this.insertTanggalInput);
      formData.append('harga', this.insertHarga);
      formData.append('file_cover', this.file);

      axios.post(postApi, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.readData();
          this.insertKode = '';
          this.insertJudul = '';
          this.insertKodeKategori = '';
          this.insertPengarang = '';
          this.insertPenerbit = '';
          this.insertTahun = '';
          this.insertTanggalInput = '';
          this.insertHarga = '';
          this.$refs.file.value = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },


    postkategori() {
      
      let formData = new FormData();
      formData.append('kode', this.insertKode1);
      formData.append('kategori', this.insertKategori);
      

      axios.post(postApi2, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((resp) => {
          console.log(resp.data);
          this.readData2();
          this.insertKode1 = '';
          this.insertKategori = '';
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deletebuku(kode) {
      if (confirm('Apakah anda ingin menghapus data?')) {
        axios.get(delAPI + '?kode=' + kode)
          .then((resp) => {
            console.log(resp);
            this.readData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },


    deletekategori(kode) {
      if (confirm('Apakah anda ingin menghapus data?')) {
        axios.get(delAPI2 + '?kode=' + kode)
          .then((resp) => {
            console.log(resp);
            this.readData2();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
