// Data kosakata (offline, hasil konversi dari kosakata_inggris.xlsx)
const KATEGORI = [
  {
    "id": 1,
    "nama": "Rumah"
  },
  {
    "id": 2,
    "nama": "Makanan"
  },
  {
    "id": 3,
    "nama": "Sekolah"
  },
  {
    "id": 4,
    "nama": "Kantor"
  },
  {
    "id": 5,
    "nama": "Jalan"
  }
];

const KOSAKATA = [
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Roof",
    "indonesia": "Atap"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Wall",
    "indonesia": "Dinding"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Floor",
    "indonesia": "Lantai"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Ceiling",
    "indonesia": "Langit-langit"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Door",
    "indonesia": "Pintu"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Window",
    "indonesia": "Jendela"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Living room",
    "indonesia": "Ruang tamu"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Bedroom",
    "indonesia": "Kamar tidur"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Bathroom",
    "indonesia": "Kamar mandi"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Kitchen",
    "indonesia": "Dapur"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Dining room",
    "indonesia": "Ruang makan"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Garage",
    "indonesia": "Garasi"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Garden",
    "indonesia": "Taman"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Fence",
    "indonesia": "Pagar"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Gate",
    "indonesia": "Gerbang"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Chair",
    "indonesia": "Kursi"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Table",
    "indonesia": "Meja"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Sofa",
    "indonesia": "Sofa"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Television",
    "indonesia": "Televisi"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Bed",
    "indonesia": "Kasur"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Pillow",
    "indonesia": "Bantal"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Blanket",
    "indonesia": "Selimut"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Wardrobe",
    "indonesia": "Lemari pakaian"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Mirror",
    "indonesia": "Cermin"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Sink",
    "indonesia": "Wastafel"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Stove",
    "indonesia": "Kompor"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Refrigerator",
    "indonesia": "Kulkas"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Plate",
    "indonesia": "Piring"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Glass",
    "indonesia": "Gelas"
  },
  {
    "kategori_id": 1,
    "kategori": "Rumah",
    "inggris": "Spoon",
    "indonesia": "Sendok"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Rice",
    "indonesia": "Nasi"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Bread",
    "indonesia": "Roti"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Noodle",
    "indonesia": "Mi"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Meat",
    "indonesia": "Daging"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Chicken",
    "indonesia": "Ayam"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Fish",
    "indonesia": "Ikan"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Egg",
    "indonesia": "Telur"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Soup",
    "indonesia": "Sup"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Vegetables",
    "indonesia": "Sayuran"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Fruit",
    "indonesia": "Buah"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Apple",
    "indonesia": "Apel"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Banana",
    "indonesia": "Pisang"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Orange",
    "indonesia": "Jeruk"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Cake",
    "indonesia": "Kue"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Cookie",
    "indonesia": "Biskuit"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Chocolate",
    "indonesia": "Cokelat"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Cheese",
    "indonesia": "Keju"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Milk",
    "indonesia": "Susu"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Water",
    "indonesia": "Air"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Coffee",
    "indonesia": "Kopi"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Tea",
    "indonesia": "Teh"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Juice",
    "indonesia": "Jus"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Sugar",
    "indonesia": "Gula"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Salt",
    "indonesia": "Garam"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Pepper",
    "indonesia": "Merica"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Butter",
    "indonesia": "Mentega"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Honey",
    "indonesia": "Madu"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Ice cream",
    "indonesia": "Es krim"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Salad",
    "indonesia": "Salad"
  },
  {
    "kategori_id": 2,
    "kategori": "Makanan",
    "inggris": "Peanut",
    "indonesia": "Kacang"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Student",
    "indonesia": "Murid"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Teacher",
    "indonesia": "Guru"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Principal",
    "indonesia": "Kepala sekolah"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Classroom",
    "indonesia": "Ruang kelas"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Whiteboard",
    "indonesia": "Papan tulis putih"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Marker",
    "indonesia": "Spidol"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Eraser",
    "indonesia": "Penghapus"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Desk",
    "indonesia": "Meja tulis"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Chair",
    "indonesia": "Kursi"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Book",
    "indonesia": "Buku"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Notebook",
    "indonesia": "Buku catatan"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Pen",
    "indonesia": "Pulpen"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Pencil",
    "indonesia": "Pensil"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Ruler",
    "indonesia": "Penggaris"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Bag",
    "indonesia": "Tas"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Uniform",
    "indonesia": "Seragam"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Library",
    "indonesia": "Perpustakaan"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Laboratory",
    "indonesia": "Laboratorium"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Canteen",
    "indonesia": "Kantin"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Playground",
    "indonesia": "Taman bermain"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Lesson",
    "indonesia": "Pelajaran"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Homework",
    "indonesia": "Pekerjaan rumah"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Exam",
    "indonesia": "Ujian"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Score",
    "indonesia": "Nilai"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Subject",
    "indonesia": "Mata pelajaran"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Math",
    "indonesia": "Matematika"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Science",
    "indonesia": "Ilmu pengetahuan alam"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "History",
    "indonesia": "Sejarah"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Geography",
    "indonesia": "Geografi"
  },
  {
    "kategori_id": 3,
    "kategori": "Sekolah",
    "inggris": "Art",
    "indonesia": "Seni"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Manager",
    "indonesia": "Manajer"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Employee",
    "indonesia": "Karyawan"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Colleague",
    "indonesia": "Rekan kerja"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Boss",
    "indonesia": "Atasan"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Meeting",
    "indonesia": "Rapat"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Presentation",
    "indonesia": "Presentasi"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Document",
    "indonesia": "Dokumen"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Report",
    "indonesia": "Laporan"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "File",
    "indonesia": "Berkas"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Folder",
    "indonesia": "Map"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Computer",
    "indonesia": "Komputer"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Keyboard",
    "indonesia": "Papan ketik"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Mouse",
    "indonesia": "Tetikus"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Monitor",
    "indonesia": "Layar"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Printer",
    "indonesia": "Mesin pencetak"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Photocopier",
    "indonesia": "Mesin fotokopi"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Desk",
    "indonesia": "Meja kerja"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Chair",
    "indonesia": "Kursi kantor"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Telephone",
    "indonesia": "Telepon"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Email",
    "indonesia": "Surat elektronik"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Salary",
    "indonesia": "Gaji"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Promotion",
    "indonesia": "Promosi"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Resignation",
    "indonesia": "Pengunduran diri"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Interview",
    "indonesia": "Wawancara"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Schedule",
    "indonesia": "Jadwal"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Deadline",
    "indonesia": "Tenggat waktu"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Project",
    "indonesia": "Proyek"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Client",
    "indonesia": "Klien"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Contract",
    "indonesia": "Kontrak"
  },
  {
    "kategori_id": 4,
    "kategori": "Kantor",
    "inggris": "Signature",
    "indonesia": "Tanda tangan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Road",
    "indonesia": "Jalan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Street",
    "indonesia": "Jalanan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Highway",
    "indonesia": "Jalan raya"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Intersection",
    "indonesia": "Persimpangan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Traffic light",
    "indonesia": "Lampu lalu lintas"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Zebra crossing",
    "indonesia": "Tempat penyeberangan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Sidewalk",
    "indonesia": "Trotoar"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Sign",
    "indonesia": "Rambu"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Direction",
    "indonesia": "Arah"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Bridge",
    "indonesia": "Jembatan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Tunnel",
    "indonesia": "Terowongan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Roundabout",
    "indonesia": "Bundaran"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Vehicle",
    "indonesia": "Kendaraan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Car",
    "indonesia": "Mobil"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Motorcycle",
    "indonesia": "Sepeda motor"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Bus",
    "indonesia": "Bus"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Truck",
    "indonesia": "Truk"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Bicycle",
    "indonesia": "Sepeda"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Taxi",
    "indonesia": "Taksi"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Pedestrian",
    "indonesia": "Pejalan kaki"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Driver",
    "indonesia": "Pengemudi"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Passenger",
    "indonesia": "Penumpang"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Traffic jam",
    "indonesia": "Kemacetan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Accident",
    "indonesia": "Kecelakaan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Parking lot",
    "indonesia": "Tempat parkir"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Toll booth",
    "indonesia": "Gerbang tol"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Gas station",
    "indonesia": "Pom bensin"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Map",
    "indonesia": "Peta"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Destination",
    "indonesia": "Tujuan"
  },
  {
    "kategori_id": 5,
    "kategori": "Jalan",
    "inggris": "Distance",
    "indonesia": "Jarak"
  }
];
