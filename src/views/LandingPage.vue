<script>
import axios from 'axios';
import { ref } from 'vue';

const allBuku = 'http://localhost/library/selectallbuku.php';


export default {
  data() {
    return {
      buku: ref([]),

      currentPageBuku: 1,
      perPageBuku: 4,
      paginatedBuku: ref ([]),
    };
  },

  mounted() {
    this.readData();
  },

  computed: {
  totalPagesBuku() {
    return Math.ceil(this.buku.length / this.perPageBuku);
  },
},

  methods: {
    paginateBuku(pageBuku) {
    const startIndex = (pageBuku - 1) * this.perPageBuku;
    const endIndex = startIndex + this.perPageBuku;
    this.paginatedBuku = this.buku.slice(startIndex, endIndex);
    this.currentPageBuku = pageBuku;
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
    
  }
}
</script>


<template>
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Smart Library</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
            Smart Library
          </h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Silahkan Login
              </a>
            </li>
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="username" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" placeholder="Username" />
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" v-model="password" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" placeholder="Password" />
            </div>
            <button type="button" class="btn btn-primary" v-on:click="login">
              Login
            </button>
          </ul>
        </div>
        <a class="nav-link btn btn-outline-warning text-white" href="/dashboard">Go to Administrator Page</a>
      </div>
    </div>
  </nav>
  <!-- Page content -->
  <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true"
        aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="10000">
        <img src="../assets/lib3.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block mb-5">
          <h2 style="color: aliceblue">Smart Library</h2>
          <p style="color: aliceblue">Jl.Menuju Keilmuan</p>
          <a href="#table"><button type="button" class="btn btn-secondary">
              Selengkapnya
            </button></a>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="2000">
        <img src="../assets/lib2.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block mb-5">
          <h2 style="color: aliceblue">Smart Library</h2>
          <p style="color: aliceblue">Jl.Menuju Keilmuan</p>
          <a href="#table"><button type="button" class="btn btn-secondary">
              Selengkapnya
            </button></a>
        </div>
      </div>
      <div class="carousel-item">
        <img src="../assets/lib1.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block mb-5">
          <h2 style="color: aliceblue">Smart Library</h2>
          <p style="color: aliceblue">Jl.Menuju Keilmuan</p>
          <a href="#table"><button type="button" class="btn btn-secondary">
              Selengkapnya
            </button></a>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container mb-5">
    <div class="headerpapan" id="table">
      <br>
      <br>
      <h1 class="text-center">
        Smart Library
      </h1>
      <div class="row mt-1 justify-content-center">
        <div class="col-md-8">
            
            <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Masukkan Kode Buku..." aria-label="Recipient's username" aria-describedby="button-addon2" v-model="searchQuery" @input="getList">
            <button class="btn btn-dark" type="button" id="search-button">Search</button>
            </div>
        </div>
    </div>
    </div>

    

    <div>
      <div class="row mt-5">
        <div v-for="(data, index) in paginatedBuku" :key="data.kode" class="col-md-3">
          <div class="card mb-4">
            <img :src="data.file_cover" class="card-img-top" alt="file_cover" />
            <div class="card-body">
              <h5 class="card-title">{{ data.judul }}</h5>
              <hr>
              <p class="card-text"><strong>Pengarang:</strong> {{ data.pengarang }}</p>
              <p class="card-text"><strong>Penerbit:</strong> {{ data.penerbit }}</p>
              <p class="card-text"><strong>Tahun:</strong> {{ data.tahun }}</p>
              <p class="card-text"><strong>Kode Buku:</strong> {{ data.kode }}</p>
              <p class="card-text"><strong>Kode Kategori:</strong> {{ data.kode_kategori }}</p>
              <p class="card-text"><strong>Harga: </strong>Rp.{{ data.harga }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br>
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
  </div>

  <footer class="bg-white py-4 mt-auto">
      <div class="container px-5">
        <div class="row align-items-center justify-content-between flex-column flex-sm-row">
            <div class="col-auto"><div class="small m-0">
              <a href="https://www.instagram.com/mr_rahman_id/"><img src="../assets/instagram.png" alt="" style="width:30px;height:30px;"></a>&nbsp;&nbsp;
              <a href="https://t.me/NOVRIRAHMAN"><img src="../assets/telegram.png" alt="" style="width:30px;height:30px;"></a>&nbsp;&nbsp;
              <a href="http://wa.me/6281270859531"><img src="../assets/whatsapp.png" alt="" style="width:30px;height:30px;"></a>
            </div>
          </div>

            <div class="col-auto"><div class="small m-0">Copyright &copy; Novri Rahman 2023</div></div>
              <div class="col-auto">
                <a class="small" href="#!">Privacy</a>
                <span class="mx-1">&middot;</span>
                <a class="small" href="#!">Terms</a>
              </div>
          </div>
      </div>
  </footer>
</template>


<style scoped>
.nav-link {
  margin-bottom: 10px;
  font-size: 30px;
  text-align: center;
}

.headerpapan {
  margin-top: 70px;
  text-align: center;
}

  .card {
  width: 14rem;
  height: auto;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
  white-space: normal;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.carousel-caption {
    
    
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .carousel-caption h2,
  .carousel-caption p {
    color: aliceblue;
  }
</style>
