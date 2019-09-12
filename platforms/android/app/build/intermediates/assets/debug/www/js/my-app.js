Morris.Donut.prototype.resizeHandler = function () {
    this.timeoutId = null;
    if (this.el && this.el.width() > 0 && this.el.height() > 0) {
        this.raphael.setSize(this.el.width(), this.el.height());
        return this.redraw();
    }
    else return null;
};
Morris.Donut.prototype.setData = function (data) {
    var row;
    this.data = data;
    this.values = (function () {
        var _i, _len, _ref, _results;
        _ref = this.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            _results.push(parseFloat(row.value));
        }
        return _results;
    }).call(this);
    if (this.el && this.el.width() > 0 && this.el.height() > 0) {
        return this.redraw();
    }
    else return null;
};

var $$ = Dom7;

// var ipServer="http://192.168.0.18/160416016_TA/";
var app = new Framework7({
	root: '#app',
	name: 'Belajar Statistika Deskriptif',
	id: 'com.160416016.ta',
	panel: { swipe: 'left' },
	theme: 'md',
	routes: [
		{
			path: '/pengenalan/',
			url: '/pengenalan.html'
		},
		{
			path: '/materi/',
			url: '/materi.html'
		},
		{
			path: '/latihan-soal/',
			url: '/latihan-soal.html'
		},
		{
			path: '/ls-akhiri/',
			url: '/ls-akhiri.html'
		},
		{
			path: '/ruang-uji/',
			url: '/ruang-uji.html'
		},
		{
			path: '/ru-soal/',
			url: '/ru-soal.html'
		},
		{
			path: '/ru-akhiri/',
			url: '/ru-akhiri.html'
		},
		{
			path: '/soal/',
			url: '/soal.html'
		},
		{
			path: '/olah-data/',
			url: '/olah-data.html'
		},
		{
			path: '/cara-penggunaan/',
			url: '/cara-penggunaan.html'
		},
		{
			path: '/pengaturan/',
			url: '/pengaturan.html'
		},
		{
			path: '/tentang-aplikasi/',
			url: '/tentang-aplikasi.html'
		}
	]
	});

var mainView = app.views.create('.view-main',{
 url:'/pengenalan/'	
});

// Perkumpulan Para Variabel
var cekSifat="kuantitatif";
var cekJenisData="tunggal";
var cekJenisVariabel="diskrit";
var cekFrekuensi="belum";

var cekKuartil = "";
var cekDesil = "";
var cekPersentil = "";

var cekVarian = "sampel";
var cekSD = "sampel";

var dc=2;
if (localStorage.getItem("decimal")!=null)
{
	dc=localStorage.getItem("decimal");
}

//----- PERKUMPULAN PARA FUNCTION -----//
function getKoma(num,belakang) {
	var temp=Math.round(num*1);
	var temp2=num*1;
	if (temp==temp2)
	{
		return temp;
	}
	else {
		return temp2.toFixed(belakang);
	}
}
//FUNCTION OLAH DATA
//UKURAN PEMUSATAN DATA
function meanFunction(nilaiData) {
	var html = "";
	var totalNilaiData = 0;

	for (var i = 0; i < nilaiData.length; i++) {
		nilaiData[i] = parseInt(nilaiData[i]);
		totalNilaiData += nilaiData[i];
	}

  	var totalData = nilaiData.length;
	var mean = totalNilaiData / totalData;

	html = '<li><b>Langkah 1:</b><br> Jumlahkan semua nilai data, sehingga didapatkan total nilai data <b>'+totalNilaiData+'</b>. Hitung juga total data, sehingga didapatkan total data <b>'+totalData+'</b></li>';

	html += '<li><b>Langkah 2:</b><br> Hitung mean dengan cara total nilai data dibagi dengan total data, sehingga didapati hasil demikian <b>'+totalNilaiData+' / '+totalData+' = '+getKoma(mean, dc)+'</b></li>';
	return html;
}
var meanKFPembilang = 0;
var meanKFPenyebut = 0;
function meanKelompokFunctionPembilang(titikTengah, frekuensi) {
	var tt = titikTengah;
	var freq = frekuensi;
	meanKFPembilang += tt * freq;
	return meanKFPembilang;
}
function meanKelompokFunctionPenyebut(frekuensi) {
	var freq = frekuensi;
	meanKFPenyebut += freq;
	return meanKFPenyebut;
}
function meanKelompokFunction(pembilang, penyebut) {
	var atas = pembilang;
	var bawah = penyebut;
	var meanTabel = 0;
	meanTabel = atas / bawah;

	html = '<li><b>Langkah 1:</b><br> rumus mean data berkelompok dicari dengan persamaan <br>'+
  	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/mean-berkelompok.png"><br>'+
  	'dimana: <br>'+
  	'X̄ = mean data berkelompok<br>'+
  	'Xi = titik tengah kelas ke-i<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'Dari data di atas, jumlahkan titik tengah baris ke-x dengan frekuensi baris ke-x, sehingga didapatkan hasil <b>'+atas+'</b></li>';
  	html += '<li><b>Langkah 2:</b><br> jumlahkan semua frekuensi yang ada pada data tersebut, hasilnya adalah <b>'+bawah+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Hasil langkah 1 dibagi langkah 2, hasilnya adalah <b>'+atas+' / '+bawah+' = '+getKoma(meanTabel, dc)+'</b></li>';
	return html;
}
function medianFunction(nilaiData) {
	var temp = 0;
	var html = "";

	if(nilaiData.length ===0) return 0;

	nilaiData.sort(function(a,b){
		return a-b;
	});

	var temp = document.getElementById(nilaiData);
	var joinMedian = nilaiData.join(";");
	$$("#medianTextArea").val(joinMedian);


	var half = Math.floor(nilaiData.length / 2);
	if (nilaiData.length % 2) {
		temp = nilaiData[half];
	}
	else {
		var median1 = nilaiData[half-1] / 2;
		var median2 = nilaiData[half] / 2;
		temp = (median1 + median2);
	}

	html = '<li><b>Langkah 1:</b><br> Urutkan data dari nilai terkecil ke nilai terbesar</li>';

	html += '<li><b>Langkah 2:</b><br> Hitung jumlah data, jika data ganjil maka ambil nilai tengah dari data tengah.<br>Jika data genap, maka ambil nilai dari 2 data tengah kemudian nilai data tersebut dijumlahkan dan dibagi 2. Hasil median adalah <b>'+temp+'</b></li>';
	return html;
}
function medianKelompokFunction(arrayFkk, arrayTB) {
	var html = "";
	var dataMedian = getKoma((0.5*arrayFkk[arrayFkk.length-1]), dc);
	//ambil index baris data median
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(dataMedian) <= parseFloat(getKoma(arrayFkk[i], dc))) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}
	//ambil batas bawah
	var batasBawahMedian = 0;
	var batasAtasMedian = 0;
	if(Number.isInteger(arrayTB[index])) {
		batasBawahMedian = arrayTB[index]-0.5; //diskrit dikurang 0,5
		batasAtasMedian = arrayTB[index+1]-0.5
	}
	else {
		batasBawahMedian = arrayTB[index];
		batasAtasMedian = arrayTB[index+1]-1; //Kontinu tetap
	}

	var interval = batasAtasMedian - batasBawahMedian;
	//hitung Median
	var median = batasBawahMedian+(((parseFloat(dataMedian)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*interval);

	html = '<li><b>Langkah 1:</b><br> rumus median data berkelompok dicari dengan persamaan <br>'+
  	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/median-berkelompok.png"><br>'+
  	'dimana: <br>'+
  	'Me = Median data berkelompok<br>'+
  	'Tb = tepi bawah kelas median<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas median<br>'+
  	'p = panjang kelas interval<br></b></li>';
	html += '<li><b>Langkah 2:</b><br> Hitung letak median dengan cara <b>0.5 * total frekuensi = 0.5 * '+arrayFkk[arrayFkk.length-1]+
	' = '+getKoma((0.5*arrayFkk[arrayFkk.length-1]), dc)+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas median, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Tepi bawah kelas median didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah median adalah <b>'+batasBawahMedian+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> masukan semua nilai ke dalam rumus,<b> Me = '+batasBawahMedian+' + (('+dataMedian+' - '+fkkSebelum+')/ '+arrayFkk[arrayFkk.length-1]+') * '+interval+' = '+getKoma(median, dc)+'</b></li>';
	return html;
}
function modusFunction(nilaiData) {
	var html = "";

	if(nilaiData.length == 0)
	{
	    return null;
	}
	//https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
	var modeMap = {};
	var maxEl = "";//nilaiData[0], maxCount = 1;
	var maxCount=-1;

	var adaBeda=false;
	for(var i = 0; i < nilaiData.length; i++)
	{
	    var el = nilaiData[i];
	    if(modeMap[el] == null) {
	        modeMap[el] = 1;
	    }
	    else {
	        modeMap[el]++;  
	    }
	   
	}
	var adaBeda=false;
	for (var el in modeMap) {
	    
	    if(modeMap[el] >= maxCount)
	    {
	    	if (modeMap[el]>maxCount) //jika ada 1 yang lebih besar dari pada max count
	    	{
	    		if (maxCount!=-1)
	    		{
		    		adaBeda=true;	
	    		}
	    		maxEl=el;
	    	}
	    	else {
	    		maxEl = maxEl+","+el;	
	    	}
	        
	        maxCount = modeMap[el];
	    }
	    else { //jika ada yang lebih kecil
	    	adaBeda=true;
	    }
	}
	if (!adaBeda)
	{
		maxEl="Tidak ada modus";
	}
	html = '<li><b>Langkah:</b><br> Catat semua nilai data yang berbeda, lalu hitung berapa banyak nilai data tersebut ada dalam data. Modus dari data di atas adalah <b>'+maxEl+'</b></li>';

	return html;
}
function modusKelompokFunction(arrayFrek, arrayTB) {
	var html= "";

	//ambil index
	var max = Math.max.apply(null, arrayFrek);
	var index = arrayFrek.indexOf(max);
	// alert(max + '-' + index);

	//hitung d1 dan d2
	var frekSebelum = 0;
	var frekSetelah = 0;
	if(index-1 < 0 && index+1 <= arrayFrek.length-1)
	{
		frekSetelah = arrayFrek[index+1];
	}
	else if(index-1 >= 0 && index+1 > arrayFrek.length-1)
	{
		frekSebelum = arrayFrek[index-1];
	}
	else if(index-1 >= 0 && index+1 <= arrayFrek.length-1)
	{
		frekSebelum = arrayFrek[index-1];
		frekSetelah = arrayFrek[index+1];
	}
	var d1 = arrayFrek[index] - frekSebelum;
	var d2 = arrayFrek[index] - frekSetelah;

	//ambil batas bawah
	var batasBawahModus = 0;
	var batasAtasModus = 0;
	if(Number.isInteger(arrayTB[index])) {
		batasBawahModus = arrayTB[index]-0.5; //diskrit dikurang 0,5
		batasAtasModus = arrayTB[index+1]-0.5
	}
	else {
		batasBawahModus = arrayTB[index];
		batasAtasModus = arrayTB[index+1]-1; //Kontinu tetap
	}

	var interval = batasAtasModus - batasBawahModus;

	//hitung modus
	var modus = batasBawahModus + ((d1/(d1+d2))*interval);

	html = '<li><b>Langkah 1:</b><br> rumus median data berkelompok dicari dengan persamaan <br>'+
  	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/modus-berkelompok.png"><br>'+
  	'dimana: <br>'+
  	'Mo = Modus data berkelompok<br>'+
  	'Tb = Modus data berkelompok<br>'+
  	'd1 = selisih frekuensi kelas modus dengan frekuensi sebelum kelas modus<br>'+
  	'd2 = selisih frekuensi kelas modus dengan frekuensi sesudah kelas modus<br>'+
  	'p = panjang kelas interval<br></b></li>';
	html += '<li><b>Langkah 2:</b><br> Tepi bawah kelas median didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah median adalah <b>'+batasBawahModus+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Hitung d1 kelas modus, <b> d1 = '+arrayFrek[index]+' - '+frekSebelum+' = '+d1+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Hitung d2 kelas modus, <b> d1 = '+arrayFrek[index]+' - '+frekSetelah+' = '+d2+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> Mo = '+batasBawahModus+' + ('+d1+
	' / ('+d1+' + '+d2+')) * '+interval+' = '+getKoma(modus, dc)+'</b></li>';
	return html;
}
//FUNCTION UKURAN LOKASI
function kuartilFunction(nilaiData, nomorKuartil) {
	var html = "";
	var kuartil = 0;

	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinKuartil = nilaiData.join(";");
	$$("#kuartilTextArea").val(joinKuartil);


	var letakKuartil = (nomorKuartil * (nilaiData.length + 1)) / 4;
	var lkX = Math.floor(letakKuartil);

	if(lkX == 0) {
		lkX = 1;
	}

	kuartil = (nilaiData[lkX-1]*1) + ((letakKuartil - lkX) * (nilaiData[(lkX)] - nilaiData[lkX-1]));

	html = '<li><b>Langkah 1:</b><br> Cari letak kuartil dengan persamaan <br>'+
	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/letak-kuartil.png"><br>'+
	'dimana: <br>'+
	'LKi = Letak kuartil ke-i<br>'+
	'i = bilangan bulat antara 1 (Q1),2 (Q2), dan 3 (Q3)<br>'+
	'n = jumlah frekuensi data berkelompok<br>'+
	'Dari data di atas, letak kuartilnya adalah <br>'+
	'<b>('+nomorKuartil+' * '+nilaiData.length+' + 1) / 4 = '+letakKuartil+'</b></li>';
	html += '<li><b>Langkah 2:</b><br> Cari nilai kuartil dengan persamaan <br>' +
	'<img id="kuartilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/kuartil.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'n = jumlah frekuensi data berkelompok<br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai kuartilnya adalah <br><b>' + 
	nilaiData[lkX-1]+' + (('+letakKuartil+' - '+lkX+') * ('+nilaiData[(lkX)]+' - '+nilaiData[lkX-1]+
	')) = '+getKoma(kuartil, dc)+'</b></li>';

	return html;
}
function kuartilFrekuensiFunction(arrVariable, arrFkk, nomorKuartil) {
	var letakKuartil = nomorKuartil*(arrFkk[arrFkk.length-1]+1)/4;	
	var lkX = Math.floor(letakKuartil);
	if(lkX == 0) {
		lkX = 1;
	}
	//ambil index baris data median
	var index = 0;
	for(var i=0; i<arrFkk.length; i++) {
		if(lkX <= parseInt(arrFkk[i])) {
			index = i;
			break;
		}
	}

	var kuartil = 0;
	var dxplus = 0;
	if(lkX == arrFkk[index])
	{
		dxplus = arrVariable[index+1];
	}
	else
	{
		dxplus = arrVariable[index];
	}
	kuartil = (parseFloat(arrVariable[index]) + ((letakKuartil - lkX) * (dxplus - arrVariable[index])));

	var html = '<li><b>Langkah 1:</b><br> Hitung nilai-nilai Frekuensi Kumulatif. Nilai frekuensi kumulatif yang didapatkan adalah: '+arrFkk;
	html += '<li><b>Langkah 2:</b><br> Hitung letak kuartil dengan cara <b>nomor kuartil * (total frekuensi + 1) / 4 = '+nomorKuartil+' * ('+arrFkk[arrFkk.length-1]+
	 ' + 1) / 4 = '+letakKuartil+'</b></li>';
	 html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana pada data ke-'+letakKuartil+'.';
	 html += '<li><b>Langkah 4:</b><br> Cari nilai kuartil dengan persamaan <br>' +
	'<img id="kuartilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/kuartil.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'n = jumlah frekuensi data berkelompok<br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai kuartilnya adalah <br><b>' + 
	arrVariable[index]+' + (('+letakKuartil+' - '+lkX+') * ('+dxplus+' - '+arrVariable[index]+
	')) = '+getKoma(kuartil,dc)+'</b></li>';
	 return html;
}
function kuartilKelompokFunction(nomorKuartil, arrayFkk, arrayTB) {
	var html = "";
	

	var letakKuartil = getKoma(((nomorKuartil*arrayFkk[arrayFkk.length-1])/4), dc);

	var index = 0;
	for(var i=0; i<arrayFkk.length; i++)
	{
		if(parseFloat(letakKuartil) <= parseFloat(getKoma(arrayFkk[i], dc)))
		{
			index = i;
			break;
		}
	}

	var fkkSebelum = 0;
	if(index-1 >= 0)
	{
		fkkSebelum = arrayFkk[index-1];
	}
	var frekuensiKuartil = arrayFkk[index] - fkkSebelum;
	var interval = arrayTB[index+1] - arrayTB[index];

	//ambil batas bawah
	var batasBawahKuartil = 0;
	if(Number.isInteger(arrayTB[index]))
	{
		batasBawahKuartil = arrayTB[index]-0.5; //diskrit dikurang 0,5
	}
	else
	{
		batasBawahKuartil = arrayTB[index]; //Kontinu tetap
	}


	var kuartil = 1;
	kuartil = (batasBawahKuartil+(((parseFloat(letakKuartil)-fkkSebelum)/frekuensiKuartil)*interval));

	//alert("test :"+getKoma(2,dc));
	html = '<li><b>Langkah 1:</b><br> Cari nilai kuartil dengan persamaan <br>' +
	'<img id="kuartilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/kuartil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'Tb = tepi bawah kelas kuartil<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas kuartil<br>'+
  	'p = panjang kelas interval<br></li>';
  	html += '<li><b>Langkah 2:</b><br> Cari letak kuartil dengan nomor kuartil dikali dengan jumlah frekuensi, lalu dibagi 4. Hasil letak kuartil di atas adalah <b>('+nomorKuartil+' * '+arrayFkk[arrayFkk.length-1]+') / 4 = '+letakKuartil+'</b><br></li>';
  	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat letak kuartil termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas kuartil, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Tepi bawah kelas kuartil didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah kuartil adalah <b>'+batasBawahKuartil+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> K('+nomorKuartil+') = '+batasBawahKuartil+' + (('+letakKuartil+' - '+fkkSebelum+')/ '+frekuensiKuartil+') * '+getKoma(interval, dc)+' = '+getKoma(kuartil, dc)+'</b></li>';
	return html;
}
function desilFunction(nilaiData, nomorDesil) {
	var desil = 0;
	var html = "";

	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinDesil = nilaiData.join(";");

	$$("#desilTextArea").val(joinDesil);

	var letakDesil = (nomorDesil * (nilaiData.length + 1)) / 10;
	var lkX = Math.floor(letakDesil);

	if(lkX == 0) {
		lkX = 1;
	}

	desil = (nilaiData[lkX-1]*1) + ((letakDesil - lkX) * (nilaiData[lkX] - nilaiData[lkX-1]));
	desil = desil * 1;
	// console.log(letakDesil - index);

	html = '<li><b>Langkah 1:</b><br> Urutkan data di atas dari nilai terkecil hingga nilai terbesar';
	html += '<li><b>Langkah 2:</b><br> Cari letak desil dengan persamaan <br>'+
	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/letak-desil.png"><br>'+
	'dimana: <br>'+
	'LDi = Letak desil ke-i<br>'+
	'i = bilangan bulat antara 1 sampai 9<br>'+
	'n = jumlah data<br>'+
	'Dari data di atas, letak desilnya adalah <br>'+
	'<b>('+nomorDesil+' * '+nilaiData.length+' + 1) / 10 = '+letakDesil+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Hasil desil tersebut dibagi menjadi 2 bagian, dimana bagian x '+
	'adalah bagian di depan angka desimal, sedangkan bagian y adalah bagian di belakang angka desimal<br>'+
	'DKi = x.y </li>';
	html += '<li><b>Langkah 4:</b><br> Cari nilai desil dengan persamaan <br>' +
	'<img id="desilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/desil.png"><br>'+
	'dimana: <br>' +
	'Di = nilai desil ke i <br>' + 
	'LDi = nilai letak desil ke-i <br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai desilnya adalah <br><b>' + 
	nilaiData[lkX-1]+' + (('+letakDesil+' - '+lkX+') * ('+nilaiData[lkX]+' - '+nilaiData[lkX-1]+
	')) = '+getKoma(desil, dc)+'</b></li>';
	return html;
}
function desilFrekuensiFunction(arrVariable, arrFkk, nomorDesil){
	var letakDesil = nomorDesil*(arrFkk[arrFkk.length-1]+1)/10;
	var lkX = Math.floor(letakDesil);
	if(lkX == 0) {
		lkX = 1;
	}
	//ambil index baris data median
	var index = 0;
	for(var i=0; i<arrFkk.length; i++) {
		if(lkX <= parseInt(arrFkk[i])) {
			index = i;
			break;
		}
	}

	var desil = 0;
	var dxplus = 0;
	if(lkX == arrFkk[index])
	{
		dxplus = arrVariable[index+1];
	}
	else
	{
		dxplus = arrVariable[index];
	}
	desil = parseFloat(arrVariable[index]) + ((letakDesil - lkX) * (dxplus - arrVariable[index]));
	desil = desil * 1;

	var html = '<li><b>Langkah 1:</b><br> Hitung nilai-nilai Frekuensi Kumulatif. Nilai frekuensi kumulatif yang didapatkan adalah: '+arrFkk;
	html += '<li><b>Langkah 2:</b><br> Hitung letak desil dengan cara <b>nomor desil * (total frekuensi + 1) / 10 = '+nomorDesil+' * ('+arrFkk[arrFkk.length-1]+
	 ' + 1) / 10 = '+letakDesil+'</b></li>';
	 html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana pada data ke-'+letakDesil+'.';
	 html += '<li><b>Langkah 4:</b><br> Cari nilai desil dengan persamaan <br>' +
	'<img id="desilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/desil.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'n = jumlah frekuensi data berkelompok<br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai desilnya adalah <br><b>' + 
	arrVariable[index]+' + (('+letakDesil+' - '+lkX+') * ('+dxplus+' - '+arrVariable[index]+
	')) = '+getKoma(desil, dc)+'</b></li>';
	 return html;
}
function desilKelompokFunction(nomorDesil, arrayFkk, arrayTB) {
	var html = "";
	var letakDesil = getKoma(((nomorDesil*arrayFkk[arrayFkk.length-1]) / 10), dc);

	var index = 0;
	for(var i=0; i<arrayFkk.length; i++)
	{
		if(parseFloat(letakDesil) <= parseFloat(getKoma(arrayFkk[i], dc)))
		{
			index = i;
			break;
		}
	}

	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0)
	{
		fkkSebelum = arrayFkk[index-1];
	}
	var frekuensiDesil = arrayFkk[index] - fkkSebelum;
	var interval = arrayTB[index+1] - arrayTB[index];

	//ambil batas bawah
	var batasBawahDesil = 0;
	if(Number.isInteger(arrayTB[index]))
	{
		batasBawahDesil = arrayTB[index]-0.5; //diskrit dikurang 0,5
	}
	else
	{
		batasBawahDesil = arrayTB[index]; //Kontinu tetap
	}

	var desil = 1;
	desil = (batasBawahDesil+(((parseFloat(letakDesil)-fkkSebelum)/frekuensiDesil)*interval))*1;

	html = '<li><b>Langkah 1:</b><br> Cari nilai desil dengan persamaan <br>' +
	'<img id="desilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/desil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Di = nilai desil ke-i <br>' +
	'Tb = tepi bawah kelas desil<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas desil<br>'+
  	'p = panjang kelas interval<br></li>';
  	html += '<li><b>Langkah 2:</b><br> Cari letak desil dengan nomor desil dikali dengan jumlah frekuensi, lalu dibagi 4. Hasil letak desil di atas adalah <b>('+nomorDesil+' * '+arrayFkk[arrayFkk.length-1]+') / 10 = '+letakDesil+'</b><br></li>';
  	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat letak desil termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas desil, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Tepi bawah kelas desil didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah desil adalah <b>'+batasBawahDesil+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> D('+nomorDesil+') = '+batasBawahDesil+' + (('+letakDesil+' - '+fkkSebelum+')/ '+frekuensiDesil+') * '+getKoma(interval, dc)+' = '+getKoma(desil, dc)+'</b></li>';
	return html;
}
function persentilFunction(nilaiData, nomorPersentil){
	var html = "";
	var persentil = 0;
	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinPersentil = nilaiData.join(";");

	$$("#persentilTextArea").val(joinPersentil);

	var letakPersentil = (nomorPersentil * (nilaiData.length + 1)) / 100;
	var lkX = Math.floor(letakPersentil);

	if(lkX == 0) {
		lkX = 1;
	}
	var persentil = 1;
	persentil = (nilaiData[lkX-1]*1) + ((letakPersentil - lkX) * (nilaiData[lkX] - nilaiData[lkX-1]));

	html = '<li><b>Langkah 1:</b><br> Urutkan data di atas dari nilai terkecil hingga nilai terbesar';
	html += '<li><b>Langkah 2:</b><br> Cari letak persentil dengan persamaan <br>'+
	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/letak-persentil.png"><br>'+
	'dimana: <br>'+
	'LPi = Letak persentil ke-i<br>'+
	'i = bilangan bulat antara 1 sampai 9<br>'+
	'n = jumlah data<br>'+
	'Dari data di atas, letak desilnya adalah <br>'+
	'<b>('+nomorPersentil+' * '+nilaiData.length+' + 1) / 100 = '+letakPersentil+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Hasil persentil tersebut dibagi menjadi 2 bagian, dimana bagian x '+
	'adalah bagian di depan angka desimal, sedangkan bagian y adalah bagian di belakang angka desimal<br>'+
	'PKi = x.y</li>';
	html += '<li><b>Langkah 4:</b><br> Cari nilai persentil dengan persamaan <br>' +
	'<img id="persentilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/persentil.png"><br>'+
	'dimana: <br>' +
	'Pi = nilai persentil ke-i <br>' +
	'LPi = nilai letak persentil ke-i <br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai persentilnya adalah <br><b>' + 
	nilaiData[lkX-1]+' + (('+letakPersentil+' - '+lkX+') * ('+nilaiData[lkX]+' - '+nilaiData[lkX-1]+')) = '+getKoma(persentil, dc)+'</b></li>';

	return html;
}
function persentilFrekuensiFunction(arrVariable, arrFkk, nomorPersentil) {
	var letakPersentil = nomorPersentil*(arrFkk[arrFkk.length-1]+1)/100;
	var lkX = Math.floor(letakPersentil);
	if(lkX == 0) {
		lkX = 1;
	}
	//ambil index baris data median
	var index = 0;
	for(var i=0; i<arrFkk.length; i++) {
		if(lkX <= parseInt(arrFkk[i])) {
			index = i;
			break;
		}
	}

	var desil = 0;
	var dxplus = 0;
	if(lkX == arrFkk[index])
	{
		dxplus = arrVariable[index+1];
	}
	else
	{
		dxplus = arrVariable[index];
	}
	var persentil = 1;
	persentil = (parseFloat(arrVariable[index]) + ((letakPersentil - lkX) * (dxplus - arrVariable[index])));

	var html = '<li><b>Langkah 1:</b><br> Hitung nilai-nilai Frekuensi Kumulatif. Nilai frekuensi kumulatif yang didapatkan adalah: '+arrFkk;
	html += '<li><b>Langkah 2:</b><br> Hitung letak persentil dengan cara <b>nomor kuartil * (total frekuensi + 1) / 100 = '+nomorPersentil+' * ('+arrFkk[arrFkk.length-1]+
	 ' + 1) / 100 = '+letakPersentil+'</b></li>';
	 html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana pada data ke-'+letakPersentil+'.';
	 html += '<li><b>Langkah 4:</b><br> Cari nilai kuartil dengan persamaan <br>' +
	'<img id="persentilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/persentil.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'n = jumlah frekuensi data berkelompok<br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai persentilnya adalah <br><b>' + 
	arrVariable[index]+' + (('+letakPersentil+' - '+lkX+') * ('+dxplus+' - '+arrVariable[index]+
	')) = '+getKoma(persentil, dc)+'</b></li>';
	 return html;
}
function persentilKelompokFunction(nomorPersentil, arrayFkk, arrayTB) {
	var html = "";
	var letakPersentil = getKoma(((nomorPersentil*arrayFkk[arrayFkk.length-1]) / 100), dc);

	var index = 0;
	for(var i=0; i<arrayFkk.length; i++)
	{
		if(parseFloat(letakPersentil) <= parseFloat(getKoma(arrayFkk[i], dc)))
		{
			index = i;
			break;
		}
	}

	var fkkSebelum = 0;
	if(index-1 >= 0)
	{
		fkkSebelum = arrayFkk[index-1];
	}
	var frekuensiPersentil = arrayFkk[index] - fkkSebelum;
	var interval = arrayTB[index+1] - arrayTB[index];

	//ambil batas bawah
	var batasBawahPersentil = 0;
	if(Number.isInteger(arrayTB[index]))
	{
		batasBawahPersentil = arrayTB[index]-0.5; //diskrit dikurang 0,5
	}
	else
	{
		batasBawahPersentil = arrayTB[index]; //Kontinu tetap
	}

	var persentil = 1;
	persentil= (batasBawahPersentil+(((parseFloat(letakPersentil)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*arrayFkk.length));

	html = '<li><b>Langkah 1:</b><br> Cari nilai persentil dengan persamaan <br>' +
	'<img id="persentilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/persentil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Pi = nilai persentil ke-i <br>' +
	'Tb = tepi bawah kelas persentil<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas persentil<br>'+
  	'p = panjang kelas interval<br></li>';
  	html += '<li><b>Langkah 2:</b><br> Cari letak persentil dengan nomor persentil dikali dengan jumlah frekuensi, lalu dibagi 4. Hasil letak persentil di atas adalah <b>('+nomorPersentil+' * '+arrayFkk[arrayFkk.length-1]+') / 100 = '+letakPersentil+'</b><br></li>';
  	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat persentil termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas persentil, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Tepi bawah kelas persentil didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah persentil adalah <b>'+batasBawahPersentil+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> K('+nomorPersentil+') = '+batasBawahPersentil+' + (('+letakPersentil+' - '+fkkSebelum+')/ '+arrayFkk[arrayFkk.length-1]+') * '+arrayFkk.length+' = '+getKoma(persentil, dc)+'</b></li>';
	return html;
}
//FUNCTION UKURAN PENYEBARAN DATA
function varianFunction(nilaiData, cekVarian) {
	var html = "";
	var varian = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;

	for(i = 0; i < nilaiData.length; i++) {
		sum += (parseFloat(nilaiData[i]));
	}

	var mean = sum/nilaiData.length;

	for(i = 0; i < nilaiData.length; i++) {
		pembilang += Math.pow((parseFloat(nilaiData[i]) - parseFloat(getKoma(mean, dc))),2); 
	}

	if(cekVarian == "sampel") {
		penyebut = (nilaiData.length) - 1;
		varian = getKoma(pembilang, dc) / penyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-sampel.png"><br>'+
		'dimana: <br>'+
		's^2 = varian sampel<br>'+
		'Xi = nilai data ke-i<br>'+
		'X̄ = rata-rata sampel<br>'+
		'n = jumlah sampel</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+nilaiData.length+' = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan</li>';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b></li>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, hasilnya adalah <b>'+getKoma(pembilang, dc)+
		' / '+penyebut+' = '+getKoma(varian, dc)+'</b></li>';
	}
	else {
		penyebut = nilaiData.length;
		varian = getKoma(pembilang, dc) / penyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-populasi.png"><br>'+
		'dimana: <br>'+
		's^2 = varian populasi<br>'+
		'Xi = nilai data ke-i<br>'+
		'μ = rata-rata populasi<br>'+
		'N = jumlah populasi</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+nilaiData.length+' = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan</li>';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b></li>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, hasilnya adalah <b>'+getKoma(pembilang, dc)+
		' / '+penyebut+' = '+getKoma(varian,dc)+'</b></li>';
	}
	return html;
}
function varianFrekuensiFunction(arrVariable, arrFrek, cekVarian) {
	var html = "";
	var varian = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;
	var totalFrek = 0;

	for(i = 0; i < arrVariable.length; i++) {
		sum += (parseFloat(arrVariable[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}

	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(arrVariable[i]) - parseFloat(getKoma(mean, dc)),2)*arrFrek[i];
	}

	if(cekVarian == "sampel") {
		penyebut = totalFrek - 1;
		varian = getKoma(pembilang, dc) / penyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-sampel.png"><br>'+
		'dimana: <br>'+
		's^2 = varian sampel<br>'+
		'Xi = nilai data ke-i<br>'+
		'X̄ = rata-rata sampel<br>'+
		'n = jumlah sampel</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+totalFrek+' = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan dan kalikan dengan frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b></li>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, hasilnya adalah <b>'+getKoma(pembilang, dc)+
		' / '+penyebut+' = '+getKoma(varian, dc)+'</b></li>';
	}
	else {
		penyebut = totalFrek;
		varian = getKoma(pembilang,dc) / penyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-populasi.png"><br>'+
		'dimana: <br>'+
		's^2 = varian populasi<br>'+
		'Xi = nilai data ke-i<br>'+
		'μ = rata-rata populasi<br>'+
		'N = jumlah populasi</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+totalFrek+' = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan dan kalikan dengan frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b></li>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, hasilnya adalah <b>'+getKoma(pembilang, dc)+
		' / '+penyebut+' = '+getKoma(varian, dc)+'</b></li>';
	}
	return html;//tunggal frekuensi diketahui
}
var varianKFPembilang = 0;
function varianKelompokFunctionPembilang(titikTengah, frekuensi) {
	var tt = titikTengah *titikTengah;
	var freq = frekuensi;
	varianKFPembilang += tt * freq;
	return varianKFPembilang;
}
function varianKelompokFunction(arrVariable, arrFrek, cekVarian) {
	var sum = 0;
	var totalFrek = 0;
	var titikTengah = [];
	var pembilang = 0;
	var varianKelompok = 0;
	for(var i=0; i<arrVariable.length; i++)
	{
		var batasBawah = parseFloat(arrVariable[i].split('-')[0]);
		var batasAtas = parseFloat(arrVariable[i].split('-')[1]);
		titikTengah[i] = (batasAtas+batasBawah)/2;

		sum += (parseFloat(titikTengah[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}
	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(titikTengah[i]) - parseFloat(getKoma(mean, dc)),2)*parseInt(arrFrek[i]);
	}

	if(cekVarian == "sampel") {
		var varianPenyebut = totalFrek - 1;
		varianKelompok = pembilang / varianPenyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian data berkelompok pengamatan sampel adalah <br>'+
			'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-berkelompok-sampel.png"><br>'+
			'dimana: <br>'+
			's^2 = varian sampel<br>'+
			'Xi = nilai data ke-i<br>'+
			'fi = frekuensi data ke-i<br>'+
			'X̄ = rata-rata sampel<br>'+
			'n = jumlah sampel <br> Anda bisa memakai salah satu persamaan di atas</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas.<b>Mean dari data di atas adalah = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Cari hasil jumlah <b>fi*(Xi-mean)^2 = '+getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 4:</b><br> Hitung total frekuensi atau jumlah sampel data berkelompok, lalu dikurangi 1 = <b>'+
		totalFrek+' - 1 = '+varianPenyebut+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Masukan hasil langkah 2-4 ke dalam persamaan, <b>'+getKoma(pembilang, dc)+' / '+varianPenyebut+' = '+getKoma(varianKelompok, dc)+'</b></li>';
	}
	else {
		var varianPenyebut = totalFrek;
		varianKelompok = pembilang / varianPenyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian data berkelompok pengamatan sampel adalah <br>'+
			'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-berkelompok-sampel.png"><br>'+
			'dimana: <br>'+
			's^2 = varian populasi<br>'+
			'Xi = nilai data ke-i<br>'+
			'fi = frekuensi data ke-i<br>'+
			'μ = rata-rata populasi<br>'+
			'N = jumlah populasi <br> Anda bisa memakai salah satu persamaan di atas</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas.<b>Mean dari data di atas adalah = '+getKoma(mean, 3)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Cari hasil jumlah <b>fi*(Xi-mean)^2 = '+getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 4:</b><br> Hitung total frekuensi atau jumlah sampel data berkelompok, lalu dikurangi 1 = <b>'+
		totalFrek+' - 1 = '+varianPenyebut+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Masukan hasil langkah 2-4 ke dalam persamaan, <b>'+getKoma(pembilang, dc)+' / '+varianPenyebut+' = '+getKoma(varianKelompok, dc)+'</b></li>';
	}
	return html;
}
function sdFunction(nilaiData, cekSD) {
	var html = "";
	var sd = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;

	for(i = 0; i < nilaiData.length; i++) {
		sum += (parseFloat(nilaiData[i])); 
	}

	var mean = sum/nilaiData.length;

	for(i = 0; i < nilaiData.length; i++) {
		pembilang += Math.pow((parseFloat(nilaiData[i]) - parseFloat(getKoma(mean, dc))),2);
	}

	if(cekSD == "sampel") {
		penyebut = nilaiData.length - 1;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
		html = '<li><b>Langkah 1:</b><br> Persamaan standar deviasi pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/sd-sampel.png"><br>'+
		'dimana: <br>'+
		's = standar deviasi sampel<br>'+
		'Xi = nilai data ke-i<br>'+
		'X̄ = rata-rata sampel<br>'+
		'n = jumlah sampel';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+nilaiData.length+' = '+getKoma(mean, dc)+' </b>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, kemudian diakarkan.'+
		' Hasilnya adalah <b>V('+getKoma(pembilang, dc)+' / '+penyebut+') = '+getKoma(sd, dc)+'</b>';
	}
	else {
		penyebut = nilaiData.length;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
		html = '<li><b>Langkah 1:</b><br> Persamaan standar deviasi pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/sd-sampel.png"><br>'+
		'dimana: <br>'+
		's = standar deviasi populasi<br>'+
		'Xi = nilai data ke-i<br>'+
		'μ = rata-rata populasi<br>'+
		'N = jumlah populasi';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+nilaiData.length+' = '+getKoma(mean, dc)+' </b>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, kemudian diakarkan.'+
		' Hasilnya adalah <b>V('+getKoma(pembilang, dc)+' / '+penyebut+') = '+getKoma(sd, dc)+'</b>';
	}
	return html;
}
function sdFrekuensiFunction(arrVariable, arrFrek, cekVarian) {
	var html = "";
	var varian = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;
	var sd = 0;
	var totalFrek = 0;

	for(i = 0; i < arrVariable.length; i++) {
		sum += (parseFloat(arrVariable[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}

	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(arrVariable[i]) - parseFloat(getKoma(mean, dc)),2)*arrFrek[i];
	}

	if(cekVarian == "sampel") {
		penyebut = totalFrek - 1;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
		html = '<li><b>Langkah 1:</b><br> Persamaan standar deviasi pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/sd-sampel.png"><br>'+
		'dimana: <br>'+
		's^2 = standar deviasi sampel<br>'+
		'Xi = nilai data ke-i<br>'+
		'X̄ = rata-rata sampel<br>'+
		'n = jumlah sampel</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+totalFrek+' = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan dan kalikan dengan frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b></li>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, kemudian diakarkan. Hasilnya adalah <b>V('+getKoma(pembilang, dc)+' / '+penyebut+') = '+getKoma(sd, dc)+'</b></li>';
	}
	else {
		penyebut = totalFrek;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
		html = '<li><b>Langkah 1:</b><br> Persamaan standar deviasi pengamatan sampel adalah <br>'+
		'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/sd-sampel.png"><br>'+
		'dimana: <br>'+
		's^2 = standar deviasi populasi<br>'+
		'Xi = nilai data ke-i<br>'+
		'μ = rata-rata populasi<br>'+
		'N = jumlah populasi</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas, mean-nya adalah <b>'+
		sum+' / '+totalFrek+' = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Kurangi nilai data ke-i dengan mean, lalu dikuadratkan dan kalikan dengan frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Jumlahkan semua hasil langkah ketiga, sehinga didapatkan hasil <b>'+
		getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Kurangi jumlah data dengan 1, hasilnya adalah <b>'+penyebut+'</b></li>';
		html += '<li><b>Langkah 6:</b><br> Bagi hasil pada langkah 4 dan langkah 5, kemudian diakarkan. Hasilnya adalah <b>V('+getKoma(pembilang, dc)+' / '+penyebut+') = '+getKoma(sd, dc)+'</b></li>';
	}
	return html;
}
function sdKelompokFunction(arrVariable, arrFrek, cekVarian) {
	var sum = 0;
	var totalFrek = 0;
	var titikTengah = [];
	var pembilang = 0;
	var penyebut = 0;
	var sdKelompok = 0;

	for(var i=0; i<arrVariable.length; i++)
	{
		var batasBawah = parseFloat(arrVariable[i].split('-')[0]);
		var batasAtas = parseFloat(arrVariable[i].split('-')[1]);
		titikTengah[i] = (batasAtas+batasBawah)/2;

		sum += (parseFloat(titikTengah[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}
	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(titikTengah[i]) - parseFloat(getKoma(mean, dc)),2)*parseInt(arrFrek[i]);
	}

	if(cekVarian == "sampel") {
		penyebut = totalFrek - 1;
		sdKelompok = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
		html = '<li><b>Langkah 1:</b><br> Persamaan standar deviasi data berkelompok pengamatan sampel adalah <br>'+
			'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/sd-berkelompok-sampel.png"><br>'+
			'dimana: <br>'+
			's^2 = standar deviasi sampel<br>'+
			'Xi = nilai data ke-i<br>'+
			'fi = frekuensi data ke-i<br>'+
			'X̄ = rata-rata sampel<br>'+
			'n = jumlah sampel <br> Anda bisa memakai salah satu persamaan di atas</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas.<b>Mean dari data di atas adalah = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Cari hasil jumlah <b>fi*(Xi-mean)^2 = '+getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 4:</b><br> Hitung total frekuensi atau jumlah sampel data berkelompok, lalu dikurangi 1 = <b>'+
		totalFrek+' - 1 = '+penyebut+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Masukan hasil langkah 2-4 ke dalam persamaan, kemudian diakarkan.<b>V('+getKoma(pembilang, dc)+' / '+penyebut+') = '+getKoma(sdKelompok, dc)+'</b></li>';
	}
	else {
		penyebut = totalFrek;
		sdKelompok = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
		html = '<li><b>Langkah 1:</b><br> Persamaan standar deviasi data berkelompok pengamatan sampel adalah <br>'+
			'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/sd-berkelompok-sampel.png"><br>'+
			'dimana: <br>'+
			's^2 = standar deviasi populasi<br>'+
			'Xi = nilai data ke-i<br>'+
			'fi = frekuensi data ke-i<br>'+
			'μ = rata-rata populasi<br>'+
			'N = jumlah populasi <br> Anda bisa memakai salah satu persamaan di atas</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas.<b>Mean dari data di atas adalah = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Cari hasil jumlah <b>fi*(Xi-mean)^2 = '+getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 4:</b><br> Hitung total frekuensi atau jumlah sampel data berkelompok, lalu dikurangi 1 = <b>'+
		totalFrek+' - 1 = '+penyebut+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Masukan hasil langkah 2-4 ke dalam persamaan, kemudian diakarkan.<b>V('+getKoma(pembilang, dc)+' / '+penyebut+') = '+getKoma(sdKelompok, dc)+'</b></li>';
	}
	return html;
}
//FUNCTION RANDOM INPUT
function randomTextAreaDF(){
	var strData = "";
	var min=1;
	var max=15;
	for(var i=1; i<=50; i++)
	{
		//update nilai variabel
    var random = Math.floor(Math.random() * (+max - +min)) + +min;
    if(i < 50)
		{
			strData += random+';';
		}
		else if(i == 50)
		{
			strData += random;
		}
	}
	return strData;
}
function randomTextAreaUL(){
	var strData = "";
	var min=1;
	var max=20;

	var genRandom =Math.ceil(Math.random() * (2 - 0)) + 0;
	if(genRandom == 1) {
		for(var i=1; i<=15; i++)
		{
			//update nilai variabel
		    var random = Math.floor(Math.random() * (+max - +min)) + +min;
		    if(i < 15)
			{
				strData += random+';';
			}
			else if(i == 15)
			{
				strData += random;
			}
		}
	}
	else {
		for(var i=1; i<=15; i++)
		{
			//update nilai variabel
		    var random = Math.floor(Math.random() * (+max - +min)) + +min;
		    if(i < 12)
			{
				strData += random+';';
			}
			else if(i == 12)
			{
				strData += random;
			}
		}
	}
	return strData;
}
function randomKata(countRow) {

  	var arrayBuah = ['Apel','Jeruk','Mangga','Pir','Kiwi','Melon','Anggur','Sirsak','Leci','Duku', 'Ceri', 'Labu', 'Naga', 'Nanas', 'Jambu', 'Ara', 'Bit', 'Enau', 'Kurma', 'Salak', 'Sawo', 'Tomat', 'Timun', 'Arbei'];
  	var arrayHewan = ['Ayam', 'Sapi', 'Kuda', 'Rusa', 'Itik', 'Ular', 'Zebra', 'Anoa', 'Tawon', 'Unta', 'Macan', 'Semut', 'Babi', 'Belut', 'Buaya', 'Cicak', 'Bebek', 'Domba', 'Gajah', 'Hiena', 'Katak'];
  	var tampungKata = [];
  	var index = 0;

  	var genRandom = Math.ceil(Math.random() * (2 - 0)) + 0;
  	if(genRandom == 1) {
  		while(tampungKata.length < countRow) //ambil buah sejumlah baris yang tersedia
	  	{
	   		var fruit = arrayBuah[Math.floor(Math.random()*arrayBuah.length)];
	   		var similarity = false;
	   		for(var j=0; j<tampungKata.length; j++)
	   		{
	    		if(tampungKata[j] == fruit)
	    		{
	     			similarity = true;
	    		}
	   		}
	   		if(similarity == false)
	   		{
	    		tampungKata[index] = fruit;
	    		index++;
	   		}
		}
  	}
  	else {
  		while(tampungKata.length < countRow) //ambil buah sejumlah baris yang tersedia
	  	{
	   		var fruit = arrayHewan[Math.floor(Math.random()*arrayHewan.length)];
	   		var similarity = false;
	   		for(var j=0; j<tampungKata.length; j++)
	   		{
	    		if(tampungKata[j] == fruit)
	    		{
	     			similarity = true;
	    		}
	   		}
	   		if(similarity == false)
	   		{
	    		tampungKata[index] = fruit;
	    		index++;
	   		}
		}
  	}
  	
	return tampungKata;
}
// FUNCTION CHECKBOX
function cekAll(namaChb) {
	var namaCheckbox = namaChb;
   	var arrMarkMail = document.getElementsByName(namaCheckbox);
   	for (var i = 0; i < arrMarkMail.length; i++) {
    	arrMarkMail[i].checked = true;
   	}
}
function cekCheckbox(namaChb) {
	var checkBox = document.getElementById(namaChb);

  	if (checkBox.checked != null){
    	return checkBox;
  	} 
  	else {
    	return "none";
  	}
}
//FUNCTION LATIHAN SOAL JAWABAN
function htmlDFFunction(paramCekJenisVariabel, randomPertanyaan, nilaiData, arrJawaban, indexJawaban) { //Berkelompok
	var nilaiMax = Math.max.apply(null, nilaiData);
	var nilaiMin = Math.min.apply(null, nilaiData);
	var range = 0;
	var kelasInterval = 0;
	var lebarKelompok = 0;
	var hitung = 0;
	var sisa = 0;
	var batasBawah = 0;
	var batasAtas = 0;
	var frekKumulatif = 0;
	var html = "";
	var htmlTable = '';
	var htmlHeader = '';
	var frekuensi = 0;
	var persenFrekKumulatif = 0;
	var titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;
	var frekRelatif = frekuensi/nilaiData.length;

	//array
	var arrVariable = [];
	var arrFkk = [];
	var arrFrek = [];
	var arrTB = [];
	var arrTitikTengah = [];
	var arrPFkk = [];

	//Masukan Data ke Dalam Tabel Distribusi Frekuensi
	batasBawah = nilaiMin;
	if(paramCekJenisVariabel == "diskrit")
	{
		range = nilaiMax-nilaiMin+1;
		kelasInterval = 1+3.3*Math.log10(nilaiData.length);
		lebarKelompok = Math.ceil(range)/Math.ceil(kelasInterval);

		getKoma(kelasInterval, dc);
		lebarKelompok = Math.ceil(lebarKelompok);
	}
	else
	{
		range = nilaiMax-nilaiMin;
		kelasInterval = 1+(3.3*Math.log10(nilaiData.length));
		lebarKelompok = getKoma(range, dc)/Math.ceil(kelasInterval);
		hitung = getKoma(lebarKelompok, dc)*Math.ceil(kelasInterval);
		sisa = (hitung - parseFloat(getKoma(range, dc)))/2;
	}

	for(var i=1; i<=Math.ceil(kelasInterval); i++)
	{
		if(batasBawah <= nilaiMax)
		{
			frekuensi = 0;
			//ambil frekuensi
			for(var a=0; a<nilaiData.length; a++)
			{
				if(nilaiData[a] >= batasBawah && nilaiData[a] <= batasBawah+lebarKelompok)
				{
					frekuensi++;
				}
			}

			titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;

			frekRelatif = getKoma((frekuensi/nilaiData.length), dc);

			frekKumulatif+=frekuensi;
			persenFrekKumulatif += parseFloat(getKoma(frekRelatif*100), dc);

			//isi array
			arrFrek[i-1] = frekuensi;
			arrFkk[i-1] = frekKumulatif;
			if(paramCekJenisVariabel == "diskrit")
			{
				arrTitikTengah[i-1] = titikTengah;
				arrTB[i-1] = batasBawah-0.5;
				arrVariable[i-1] = batasBawah+'-'+(batasBawah+lebarKelompok);
				arrPFkk[i-1] = persenFrekKumulatif;
				batasBawah = batasBawah+lebarKelompok+1; //diskrit dikasih gap 1 antar data
			}
			else
			{
				arrTitikTengah[i-1] = getKoma(titikTengah, dc);
				arrTB[i-1] = getKoma(batasBawah, dc);
				arrVariable[i-1] = getKoma(batasBawah, dc)+'-'+getKoma((batasBawah+lebarKelompok), dc);
				arrPFkk[i-1] = getKoma(persenFrekKumulatif, dc);
				batasBawah = nilaiMin - getKoma(sisa, dc);
				batasAtas = batasBawah + Math.ceil(kelasInterval);
			}
		}
	}

	if (paramCekJenisVariabel == 'kontinu') {
		html = '<li><b>Langkah 1:</b><br> Nilai tertinggi dan nilai terendah data tersebut dicari. Nilai tertinggi data tersebut adalah <b>'+nilaiMax+'</b>, sedangkan nilai terendah data tersebut <b>'+nilaiMin+'</b></li>';

		html += '<li><b>Langkah 2:</b><br> Nilai range nilai dari data yang ada dihitung dengan cara nilai tertinggi dikurangi nilai terendah. Range data tersebut adalah <b>'+nilaiMax+' – '+nilaiMin+' = '+getKoma(range, dc)+'</b></li>';

		html += '<li><b>Langkah 3:</b><br> Jumlah kelompok atau kelas interval data ditentukan dengan rumus 1 + (3.3 log n), di mana n adalah jumlah data. Jika hasil desimal, maka jumlah kelompok dibulatkan ke atas menjadi bilangan bulat.  Jumlah kelompok data tersebut adalah <b>1 + (3.3 log '+nilaiData.length+') = '+getKoma(kelasInterval, dc)+' ≈ '+Math.ceil(kelasInterval)+'</b></li>';

		html += '<li><b>Langkah 4:</b><br> Lebar tiap kelompok ditentukan dengan cara range dibagi jumlah kelompok. Jika hasil berupa desimal dengan digit lebih dari 2, maka desimal tersebut diambil 2 digit dengan cara dibulatkan ke atas. Berdasarkan perhitungan, lebar kelompok data tersebut adalah <b>'+getKoma(range, dc) +' dibagi '+Math.ceil(kelasInterval)+' = '+getKoma(lebarKelompok, dc)+'</b></li>';

		html += '<li><b>Langkah 5:</b><br> Sisa data tersebut dihitung menggunakan rumus:<br><img src=\"img/persamaan21.png\"><br>Sisa data tersebut adalah <b>'+getKoma(sisa, dc)+'</b>, di mana lebar dikali jumlah kelompok adalah '+hitung+'. Lalu '+hitung+' dikurangi range '+getKoma(range, dc)+', kemudian dibagi 2</li>';

		html += '<li><b>Langkah 6:</b><br> Kelas dibuat dengan menentukan batas bawah dan batas atas setiap kelompok. Batas bawah kelompok didapatkan dari nilai minimum dikurang sisa, sedangkan batas atas kelompok didapatkan dari batas bawah kelompok ditambah jumlah kelompok. Batas bawah kelompok pertama data tersebut adalah <b>'+nilaiMin+' – '+getKoma(sisa, dc)+' = '+getKoma(batasBawah, dc)+'</b>, sedangkan batas atas pertama kelompok data tersebut adalah <b>'+getKoma(batasBawah, dc)+' + '+Math.ceil(kelasInterval)+' = '+getKoma(batasAtas, dc)+'</b></li>';

		html += '<li><b>Langkah 7:</b><br> Hitung frekuensi data setiap kelompok, frekuensi kumulatif setiap kelompok, persen frekuensi kumulatif setiap kelompok dan titik tengah setiap kelompok.</li>';
		html += '<li><b>Langkah 8:</b><br> Berdasarkan soal di atas, '+dfPertanyaan(randomPertanyaan)+' pada data tersebut adalah: '+arrJawaban+'</li>';
		html += '<li><b>Langkah 9:</b><br>'+dfPertanyaan(randomPertanyaan)+' ke-'+indexJawaban+' pada data tersebut adalah: '+arrJawaban[indexJawaban-1]+'</li>';
	}
	else {
		html = '<li><b>Langkah 1:</b><br> Nilai tertinggi dan nilai terendah data tersebut dicari. Nilai tertinggi data tersebut adalah <b>'+nilaiMax+'</b>, sedangkan nilai terendah data tersebut <b>'+nilaiMin+'</b></li>';

		html += '<li><b>Langkah 2:</b><br> Nilai range nilai dari data yang ada dihitung dengan cara nilai tertinggi dikurangi nilai terendah ditambah satu. Range data tersebut adalah <b>'+nilaiMax+' – '+nilaiMin+' + 1 = '+Math.ceil(range)+'</b></li>';

		html += '<li><b>Langkah 3:</b><br> Jumlah kelompok atau kelas interval data ditentukan dengan rumus 1 + (3.3 log n), di mana n adalah jumlah data. Jumlah kelompok data tersebut adalah <b>1 + 3.3 log '+nilaiData.length+') = '+getKoma(kelasInterval, dc)+' ≈ '+Math.ceil(kelasInterval)+'</b></li>';

		html += '<li><b>Langkah 4:</b><br> Lebar tiap kelompok ditentukan dengan cara range dibagi jumlah kelompok. Lebar data tersebut adalah <b>'+Math.ceil(range)+' dibagi '+Math.ceil(kelasInterval)+' = '+Math.ceil(lebarKelompok)+' ≈ '+Math.ceil(lebarKelompok)+'</b></li>';

		html += '<li><b>Langkah 5:</b><br> Tabel distribusi frekuensi dibuat sesuai dengan jumlah kelompok yang telah dihitung. Kelompok batas bawah pertama diambil dari nilai terendah, kemudian ditambah lebar kelompok. Pada kelompok selanjutnya. Batas bawah kelompok selanjutnya didapatkan dari batas atas kelompok sebelumnya ditambah 1</li>';

		html += '<li><b>Langkah 6:</b><br> Batas bawah nyata dan batas atas nyata kelas dihitung. Batas bawah nyata didapatkan dari (batas bawah kelompok ke-x) – 0,5, sedangkan batas atas nyata didapatkan dari (batas atas kelompok ke-x) + 0,5</li>';

		html += '<li><b>Langkah 7:</b><br> Hitung frekuensi data setiap kelompok, frekuensi kumulatif setiap kelompok, persen frekuensi kumulatif setiap kelompok dan titik tengah setiap kelompok.</li>';
		html += '<li><b>Langkah 8:</b><br> Berdasarkan soal di atas, '+dfPertanyaan(randomPertanyaan)+' pada data tersebut adalah: '+arrJawaban+'</li>';
		html += '<li><b>Langkah 9:</b><br>'+dfPertanyaan(randomPertanyaan)+' ke-'+indexJawaban+' pada data tersebut adalah: '+arrJawaban[indexJawaban-1]+'</li>';
	}
	return html;
}
function dfFunction(paramCekJenisVariabel, randomPertanyaan, nilaiData) {
	var nilaiMax = Math.max.apply(null, nilaiData);
	var nilaiMin = Math.min.apply(null, nilaiData);
	var range = 0;
	var kelasInterval = 0;
	var lebarKelompok = 0;
	var hitung = 0;
	var sisa = 0;
	var batasBawah = 0;
	var batasAtas = 0;
	var frekKumulatif = 0;
	var html = "";
	var htmlTable = '';
	var htmlHeader = '';
	var frekuensi = 0;
	var persenFrekKumulatif = 0;
	var titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;
	var frekRelatif = frekuensi/nilaiData.length;

	//array
	var arrVariable = [];
	var arrFkk = [];
	var arrFrek = [];
	var arrTB = [];
	var arrTitikTengah = [];
	var arrPFkk = [];

	range = nilaiMax-nilaiMin+1;

	kelasInterval = 1+3.3*Math.log10(nilaiData.length);
	getKoma(kelasInterval, dc);

	lebarKelompok = Math.ceil(range)/Math.ceil(kelasInterval);
	Math.ceil(lebarKelompok);

	//Masukan Data ke Dalam Tabel Distribusi Frekuensi
	batasBawah = nilaiMin;
	if(paramCekJenisVariabel == "diskrit")
	{
		lebarKelompok = Math.ceil(lebarKelompok);
	}
	else
	{
		lebarKelompok = parseFloat(getKoma(lebarKelompok, dc));
	}

	for(var i=1; i<=Math.ceil(kelasInterval); i++)
	{
		if(batasBawah <= nilaiMax)
		{
			frekuensi = 0;
			//ambil frekuensi
			for(var a=0; a<nilaiData.length; a++)
			{
				if(nilaiData[a] >= batasBawah && nilaiData[a] <= batasBawah+lebarKelompok)
				{
					frekuensi++;
				}
			}

			titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;

			frekRelatif = getKoma((frekuensi/nilaiData.length), dc);

			frekKumulatif+=frekuensi;
			persenFrekKumulatif += parseFloat(getKoma((frekRelatif*100), dc));

			//isi array
			arrFrek[i-1] = frekuensi;
			arrFkk[i-1] = frekKumulatif;
			if(paramCekJenisVariabel == "diskrit")
			{
				arrTitikTengah[i-1] = titikTengah;
				arrTB[i-1] = batasBawah-0.5;
				arrVariable[i-1] = batasBawah+'-'+(batasBawah+lebarKelompok);
				arrPFkk[i-1] = persenFrekKumulatif;
				batasBawah = batasBawah+lebarKelompok+1; //diskrit dikasih gap 1 antar data
			}
			else
			{
				arrTitikTengah[i-1] = getKoma(titikTengah, dc);
				arrTB[i-1] = getKoma(batasBawah, dc);
				arrVariable[i-1] = getKoma(batasBawah, dc)+'-'+getKoma((batasBawah+lebarKelompok), dc);
				arrPFkk[i-1] = getKoma(persenFrekKumulatif, dc);
				batasBawah = batasBawah+lebarKelompok;
			}
		}
	}

	if (randomPertanyaan == 1) {
		return arrVariable;
	}
	else if (randomPertanyaan == 2) {
		return arrTitikTengah;
	}
	else if (randomPertanyaan == 3) {
		return arrFrek;
	}
	else if (randomPertanyaan == 4) {
		return arrFkk;
	}
	else {
		return arrPFkk;
	}
}
function htmlDFFunctionTunggal(arrData, variabel){
	var frekuensi = 0;
	var html = "";
	for(var i=0; i<arrData.length; i++){
		if(arrData[i] == variabel)
		{
			frekuensi++;
		}
	}
	html = '<li><b>Langkah 1:</b><br> Semua data yang berbeda pada data inputan dimasukan ke dalam kolom variabel tabel distribusi frekuensi</li>';

	html += '<li><b>Langkah 2:</b><br> Hitung jumlah variabel baris ke-x yang muncul pada data inputan, kemudian masukan ke dalam kolom frekuensi baris ke-x. <br> Hasil dari soal di atas adalah '+frekuensi+'</li>';
	return html;
}
function dfFunctionTunggal(arrData, variabel){
	var frekuensi = 0;
	for(var i=0; i<arrData.length; i++){
		if(arrData[i] == variabel)
		{
			frekuensi++;
		}
	}
	return frekuensi;
}
function meanTunggal(arrData, arrFrekuensi){
	var total = 0;
	var frekuensi = 0;
	for(var i=0; i<arrData.length; i++){
		total += parseFloat(arrData[i])*parseInt(arrFrekuensi[i]);
		frekuensi += parseInt(arrFrekuensi[i]);
	}

	var hasilMean = total/frekuensi;
	return getKoma(hasilMean, dc);
}
function meanKelompok(arrData, arrFrekuensi){
	var total = 0;
	var frekuensi = 0;
	for(var i=0; i<arrData.length; i++){
		var batasBawah = parseFloat(arrData[i].split('-')[0]);
		var batasAtas = parseFloat(arrData[i].split('-')[1]);
		var titikTengah = (batasAtas + batasBawah)/2;
		total += titikTengah*parseInt(arrFrekuensi[i]);
		frekuensi += parseInt(arrFrekuensi[i]);
	}

	var hasilMean = total/frekuensi;
	return getKoma(hasilMean, dc);
}
function meanTanpaFrekuensi(arrData, tipeData){
	var total = 0;
	for(var i=0; i<arrData.length; i++){
		total += parseFloat(arrData[i]);
	}

	var hasilMean = total/arrData.length;

	if(tipeData == 'Diskrit')
	{
		return hasilMean;
	}
	else
	{
		return getKoma(hasilMean, dc);
	}
}
function htmlMean(arrData, arrFrekuensi, jenisData){
	var html = "";
	if(jenisData == "tunggal")
	{
		if(arrFrekuensi.length == 0) //tanpa frekuensi
		{
			var totalNilaiData = 0;
			for(var i=0; i<arrData.length; i++)
			{
				totalNilaiData+=parseFloat(arrData[i]);
			}

			html += '<li><b>Langkah 1:</b><br> Jumlahkan semua nilai data, sehingga didapatkan total nilai data <b>'+totalNilaiData+'</b>. Hitung juga total data, sehingga didapatkan total data <b>'+arrData.length+'</b></li>';
 			html += '<li><b>Langkah 2:</b><br> Hitung mean dengan cara total nilai data dibagi dengan total data, sehingga didapati hasil demikian <b>'+totalNilaiData+' / '+arrData.length+' = '+getKoma((totalNilaiData/arrData.length), dc)+'</b></li>';
		}
		else
		{
			var totalNilaiData = 0;
			var totalData = 0;
			for(var i=0; i<arrData.length; i++)
			{
				totalNilaiData+=arrData[i]*arrFrekuensi[i];
				totalData+=parseInt(arrFrekuensi[i]); 
			}
		
			html += '<li><b>Langkah 1:</b><br> Jumlahkan semua nilai data, sehingga didapatkan total nilai data <b>'+totalNilaiData+'</b>. Hitung juga total data, sehingga didapatkan total data <b>'+arrData.length+'</b></li>';
 			html += '<li><b>Langkah 2:</b><br> Hitung mean dengan cara total nilai data dibagi dengan total data, sehingga didapati hasil demikian <b>'+totalNilaiData+' / '+totalData+' = '+getKoma((totalNilaiData/totalData), dc)+'</b></li>';
		}
	}
	else if(jenisData == "kelompok")
	{
		var totalNilaiData = 0;
		var totalData = 0;
		for(var i=0; i<arrData.length; i++)
		{
			var nilaiBawah = parseFloat(arrData[i].split('-')[0]);
			var nilaiAtas = parseFloat(arrData[i].split('-')[1]);
			var titikTengah = (nilaiBawah+nilaiAtas)/2;

			totalNilaiData+=titikTengah*arrFrekuensi[i];
			totalData+=parseInt(arrFrekuensi[i]); 
		}

		html += '<li><b>Langkah 1:</b><br> rumus mean data berkelompok dicari dengan persamaan <br>';
   		html += '<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/mean-berkelompok.png"><br>';
   		html += 'dimana: <br>';
   		html += 'X̄ = mean data berkelompok<br>';
   		html += 'Xi = titik tengah kelas ke-i<br>';
   		html += 'fi = frekuensi kelas ke-i<br>';
   		html += 'Dari data di atas, kalikan titik tengah baris ke-x dengan frekuensi baris ke-x, sehingga didapatkan hasil <b>'+totalNilaiData+'</b></li>';
   		html += '<li><b>Langkah 2:</b><br> jumlahkan semua frekuensi yang ada pada data tersebut, hasilnya adalah <b>'+totalData+'</b></li>';
 		html += '<li><b>Langkah 3:</b><br> Hasil langkah 1 dibagi langkah 2, hasilnya adalah <b>'+totalNilaiData+' / '+totalData+' = '+getKoma((totalNilaiData/totalData), dc)+'</b></li>';
	}
	return html;
}
function htmlMedianTunggal(arrData, hasilMedian) {
	arrData.sort(function(a,b){
		return a-b;
	});
	var strData = "";
	for(var i=0; i<arrData.length; i++)
	{
		if(i < arrData.length-1)
		{
			strData += arrData[i]+',';
		}
		else if(i == arrData.length-1)
		{
			strData += arrData[i];
		}
	}
	var html = '<li><b>Langkah 1:</b><br> Urutkan data dari nilai terkecil ke nilai terbesar</li>'+strData;
 	html += '<li><b>Langkah 2:</b><br> Hitung jumlah data, jika data ganjil maka ambil nilai tengah dari data tengah.<br>Jika data genap, maka ambil nilai dari 2 data tengah kemudian nilai data tersebut dijumlahkan dan dibagi 2. Hasil median adalah <b>'+hasilMedian+'</b></li>';
 	return html;
}
function htmlMedianTunggalFrekuensi(arrFkk, hasilMedian){
	var dataMedian = Math.floor(0.5*arrFkk[arrFkk.length-1]);

	var html = '<li><b>Langkah 1:</b><br> Hitung nilai-nilai Frekuensi Kumulatif. Nilai frekuensi kumulatif yang didapatkan adalah: '+arrFkk;
	html += '<li><b>Langkah 2:</b><br> Hitung letak median dengan cara <b>0.5 * total frekuensi = 0.5 * '+arrFkk[arrFkk.length-1]+
	 ' = '+dataMedian+'</b></li>';
	 html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana pada data ke-'+dataMedian+'.';
	 html += '<li><b>Langkah 4:</b><br> Hitung jumlah data, jika data ganjil maka ambil nilai pada frekuensi kumulatif yang terpilih pada langkah sebelumnya.<br>Jika data genap, maka ambil nilai pada frekuensi kumulatif yang terpilih pada langkah sebelumnya kemudian lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana pada data ke-'+(dataMedian+1)+' dan ambil nilai pada frekuensi kumulatif tersebut. Kedua data tersebut dijumlahkan dan dibagi 2. Hasil median adalah <b>'+hasilMedian+'</b></li>';
	 return html;
}
function htmlMedianKelompok(arrayData, arrayFrek, arrayFkk, jenisVariabel){
	var dataMedian = getKoma((0.5*arrayFkk[arrayFkk.length-1]), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(dataMedian) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahMedian = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasMedian = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasMedian = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasMedian = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasMedian - batasBawahMedian), dc);

	//hitung Median
	var median = batasBawahMedian+(((parseFloat(dataMedian)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*interval);

	html = '<li><b>Langkah 1:</b><br> rumus median data berkelompok dicari dengan persamaan <br>'+
  	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/median-berkelompok.png"><br>'+
  	'dimana: <br>'+
  	'Me = Median data berkelompok<br>'+
  	'Tb = tepi bawah kelas median<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas median<br>'+
  	'p = panjang kelas interval<br></b></li>';
	html += '<li><b>Langkah 2:</b><br> Hitung letak median dengan cara <b>0.5 * total frekuensi = 0.5 * '+arrayFkk[arrayFkk.length-1]+
	' = '+getKoma((0.5*arrayFkk[arrayFkk.length-1]), dc)+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat median termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas median, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Tepi bawah kelas median didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah median adalah <b>'+batasBawahMedian+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> masukan semua nilai ke dalam rumus,<b> Me = '+batasBawahMedian+' + (('+dataMedian+' - '+fkkSebelum+')/ '+arrayFkk[arrayFkk.length-1]+') * '+interval+' = '+getKoma(median, dc)+'</b></li>';
	return html;
}
function medianTunggal(nilaiData) {
	var temp = 0;
	var html = "";

	if(nilaiData.length ===0) return 0;

	nilaiData.sort(function(a,b){
		return a-b;
	});

	var temp = document.getElementById(nilaiData);
	var joinMedian = nilaiData.join(";");
	$$("#medianTextArea").val(joinMedian);


	var half = Math.floor(nilaiData.length / 2);
	if (nilaiData.length % 2) {
		temp = nilaiData[half];
	}
	else {
		var median1 = nilaiData[half] / 2;
		var median2 = nilaiData[half+1] / 2;
		temp = (median1 + median2);
	}

	return getKoma(temp, dc);
}
function medianTunggalFrekuensi(arrData, arrFkk) {
	var dataMedian = Math.floor(0.5*arrFkk[arrFkk.length-1]);	

	//ambil index baris data median
	var index = 0;
	for(var i=0; i<arrFkk.length; i++) {
		if(dataMedian <= parseInt(arrFkk[i])) {
			index = i;
			break;
		}
	}

	var median = 0;
	if (arrFkk[arrFkk.length-1] % 2) {
		median = arrData[index];
	}
	else 
	{
		if(dataMedian == arrFkk[index])
		{
			median = (arrData[index]+arrData[index+1])/2;
		}
		else
		{
			median = arrData[index];
		}
	}
	return median;
}
function medianKelompok(arrayData, arrayFrek, arrayFkk, jenisVariabel) {
	var dataMedian = getKoma((0.5*arrayFkk[arrayFkk.length-1]), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(dataMedian) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahMedian = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasMedian = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasMedian = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasMedian = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasMedian - batasBawahMedian), dc);

	//hitung Median
	var median = batasBawahMedian+(((parseFloat(dataMedian)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*parseFloat(interval));

	return getKoma(median, dc);
}
function modusTunggal(nilaiData) {
	if(nilaiData.length == 0)
	{
	    return null;
	}
	//https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
	var modeMap = {};
	var maxEl = "";//nilaiData[0], maxCount = 1;
	var modus = "";
	var maxCount=-1;

	var adaBeda=false;
	for(var i = 0; i < nilaiData.length; i++)
	{
	    var el = nilaiData[i];
	    if(modeMap[el] == null) {
	        modeMap[el] = 1;
	    }
	    else {
	        modeMap[el]++;  
	    }
	   
	}

	var adaBeda=false;
	for (var el in modeMap) {
	    
	    if(modeMap[el] >= maxCount)
	    {
	    	if (modeMap[el]>maxCount) //jika ada 1 yang lebih besar dari pada max count
	    	{
	    		if (maxCount!=-1)
	    		{
		    		adaBeda=true;	
	    		}
	    		maxEl=el;
	    		modus=modeMap[el];
	    	}
	    	else {
	    		maxEl = maxEl+","+el;	
	    		modus = modus+","+modeMap[el];
	    	}
	        maxCount = modeMap[el];
	    }
	    else { //jika ada yang lebih kecil
	    	adaBeda=true;
	    }
	}
	if (!adaBeda)
	{
		maxEl="Tidak ditemukan";
	}
	return maxEl+'-'+modus;
}
function modusTunggalFrekuensi(arrData, arrFrekuensi) {
	var maxEl = "";
	var modus = "";
	var index = 0;
	var maxCount=-1;
	var adaBeda = false;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		if(parseInt(arrFrekuensi[i]) >= maxCount)
		{
			if(parseInt(arrFrekuensi[i]) > maxCount)
			{
				if (maxCount!=-1)
	    		{
		    		adaBeda=true;	
	    		}
	    		maxEl=arrData[i];
	    		modus=arrFrekuensi[i];
	    		index=i;
			}
			else
			{
				maxEl = maxEl+","+arrData[i];	
		    	modus = modus+","+arrFrekuensi[i];
			}
			maxCount = parseInt(arrFrekuensi[i]);
		}
		else
		{
			adaBeda=true;
		}
	}

	if (!adaBeda)
	{
		maxEl="Tidak ditemukan";
	}
	return maxEl+'-'+modus+'-'+index;
}
function modusKelompok(arrData, arrFrekuensi, jenisVariabel){
	var hasilModus = modusTunggalFrekuensi(arrData, arrFrekuensi);
	var batasBawah = parseFloat(hasilModus.split('-')[0]);
	var batasAtas = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtas = parseFloat(hasilModus.split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtas = parseFloat(hasilModus.split('-')[1]);
	}
	var interval = getKoma((batasAtas - batasBawah), dc);
	var frekuensiModus = parseInt(hasilModus.split('-')[2]);
	var index = parseInt(hasilModus.split('-')[3]);

	//hitung d1
	var frekSebelum = 0;
	if(index > 0)
	{
		frekSebelum = arrFrekuensi[index-1];
	}
	var d1 = frekuensiModus - frekSebelum;
	
	//hitung d2
	var frekSesudah = 0;
	if(index < arrFrekuensi.length-1)
	{
		frekSesudah = arrFrekuensi[index+1];
	}
	var d2 = frekuensiModus - frekSesudah;

	//hitung modus
	var modus = batasBawah + ((d1/(d1+d2))*parseFloat(interval));
	return getKoma(modus, dc);
}
function htmlModusTunggal(modus){
	var html = '<li><b>Langkah:</b><br> Catat semua nilai data yang berbeda, lalu hitung berapa banyak nilai data tersebut ada dalam data. Modus dari data di atas adalah <b>'+modus+'</b></li>';
	return html;
}
function htmlModusKelompok(arrData, arrFrekuensi, jenisVariabel) {
	var hasilModus = modusTunggalFrekuensi(arrData, arrFrekuensi);
	var batasBawah = parseFloat(hasilModus.split('-')[0]);
	var batasAtas = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtas = parseFloat(hasilModus.split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtas = parseFloat(hasilModus.split('-')[1]);
	}
	var interval = getKoma((batasAtas - batasBawah), dc);
	var frekuensiModus = parseInt(hasilModus.split('-')[2]);
	var index = parseInt(hasilModus.split('-')[3]);

	//hitung d1
	var frekSebelum = 0;
	if(index > 0)
	{
		frekSebelum = arrFrekuensi[index-1];
	}
	var d1 = frekuensiModus - frekSebelum;
	
	//hitung d2
	var frekSesudah = 0;
	if(index < arrFrekuensi.length-1)
	{
		frekSesudah = arrFrekuensi[index+1];
	}
	var d2 = frekuensiModus - frekSesudah;

	//hitung modus
	var modus = batasBawah + ((d1/(d1+d2))*parseFloat(interval));

	var html = '<li><b>Langkah 1:</b><br> rumus median data berkelompok dicari dengan persamaan <br>'+
   '<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/modus-berkelompok.png"><br>'+
   'dimana: <br>'+
   'Mo = Modus data berkelompok<br>'+
   'Tb = Modus data berkelompok<br>'+
   'd1 = selisih frekuensi kelas modus dengan frekuensi sebelum kelas modus<br>'+
   'd2 = selisih frekuensi kelas modus dengan frekuensi sesudah kelas modus<br>'+
   'p = panjang kelas interval<br></b></li>';
	 html += '<li><b>Langkah 2:</b><br> Tepi bawah kelas median didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah median adalah <b>'+batasBawah+'</b></li>';
	 html += '<li><b>Langkah 3:</b><br> Hitung d1 kelas modus, <b> d1 = '+frekuensiModus+' - '+frekSebelum+' = '+d1+'</b></li>';
	 html += '<li><b>Langkah 4:</b><br> Hitung d2 kelas modus, <b> d1 = '+frekuensiModus+' - '+frekSesudah+' = '+d2+'</b></li>';
	 html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> Mo = '+batasBawah+' + ('+d1+
	 ' / ('+d1+' + '+d2+')) * '+interval+' = '+getKoma(modus, dc)+'</b></li>';
	 return html;
}
function kuartilTunggal(nilaiData, nomorKuartil) {
	var html = "";
	var kuartil = 0;

	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinKuartil = nilaiData.join(";");
	$$("#kuartilTextArea").val(joinKuartil);


	var letakKuartil = (nomorKuartil * (nilaiData.length + 1)) / 4;
	var lkX = Math.floor(letakKuartil);

	if(lkX == 0) {
		lkX = 1;
	}

	kuartil = (nilaiData[lkX-1]*1) + ((letakKuartil - lkX) * (nilaiData[(lkX)] - nilaiData[lkX-1]));

	return getKoma(kuartil, dc);
}
function htmlKuartilTunggal(nilaiData, nomorKuartil) {
	var html = "";
	var kuartil = 0;

	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinKuartil = nilaiData.join(";");
	$$("#kuartilTextArea").val(joinKuartil);


	var letakKuartil = (nomorKuartil * (nilaiData.length + 1)) / 4;
	var lkX = Math.floor(letakKuartil);

	if(lkX == 0) {
		lkX = 1;
	}

	kuartil = (nilaiData[lkX-1]*1) + ((letakKuartil - lkX) * (nilaiData[(lkX)] - nilaiData[lkX-1]));

	html = '<li><b>Langkah 1:</b><br> Cari letak kuartil dengan persamaan <br>'+
	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/letak-kuartil.png"><br>'+
	'dimana: <br>'+
	'LKi = Letak kuartil ke-i<br>'+
	'i = bilangan bulat antara 1 (Q1),2 (Q2), dan 3 (Q3)<br>'+
	'n = jumlah frekuensi data berkelompok<br>'+
	'Dari data di atas, letak kuartilnya adalah <br>'+
	'<b>('+nomorKuartil+' * '+nilaiData.length+' + 1) / 4 = '+letakKuartil+'</b></li>';
	html += '<li><b>Langkah 2:</b><br> Cari nilai kuartil dengan persamaan <br>' +
	'<img id="kuartilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/kuartil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'n = jumlah frekuensi data berkelompok<br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai kuartilnya adalah <br><b>' + 
	nilaiData[lkX-1]+' + (('+letakKuartil+' - '+lkX+') * ('+nilaiData[(lkX)]+' - '+nilaiData[lkX-1]+
	')) = '+getKoma(kuartil, dc)+'</b></li>';

	return html;
}
function kuartilKelompok(arrayData, arrayFkk, nomorKuartil, jenisVariabel) {
	var letakKuartil = getKoma(((nomorKuartil*arrayFkk[arrayFkk.length-1])/4), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(letakKuartil) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahKuartil = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasKuartil = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasKuartil = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasKuartil = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasKuartil - batasBawahKuartil), dc);

	//hitung Kuartil
	var kuartil = batasBawahKuartil+(((parseFloat(letakKuartil)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*parseFloat(interval));
	//kuartil=kuartil*1;
	return getKoma(kuartil, dc);
}
function htmlKuartilKelompok(arrayData, arrayFkk, nomorKuartil, jenisVariabel){
	var html = "";
	var letakKuartil = getKoma(((nomorKuartil*arrayFkk[arrayFkk.length-1])/4), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(letakKuartil) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahKuartil = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasKuartil = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasKuartil = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasKuartil = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasKuartil - batasBawahKuartil), dc);

	//hitung Kuartil
	var kuartil = batasBawahKuartil+(((parseFloat(letakKuartil)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*parseFloat(interval));

	html = '<li><b>Langkah 1:</b><br> Cari nilai kuartil dengan persamaan <br>' +
	'<img id="kuartilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/kuartil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Ki = nilai kuartil ke-i <br>' +
	'Tb = tepi bawah kelas kuartil<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas kuartil<br>'+
  	'p = panjang kelas interval<br></li>';

  	kuartil=kuartil*1;
  	var dc=2;
  	if (localStorage.getItem("decimal")!=null)
  	{
  		dc=localStorage.getItem("decimal")*1;
  	}
  	html += '<li><b>Langkah 2:</b><br> Cari letak kuartil dengan nomor kuartil dikali dengan jumlah frekuensi, lalu dibagi 4. Hasil letak kuartil di atas adalah <b>('+nomorKuartil+' * '+arrayFkk[arrayFkk.length-1]+') / 4 = '+letakKuartil+'</b><br></li>';
  	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat letak kuartil termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas kuartil, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Tepi bawah kelas kuartil didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah kuartil adalah <b>'+batasBawahKuartil+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> K('+nomorKuartil+') = '+batasBawahKuartil+' + (('+letakKuartil+' - '+fkkSebelum+')/ '+arrayFkk[arrayFkk.length-1]+') * '+interval+' = '+getKoma(kuartil, dc)+'</b></li>';
	return html;
}
function desilTunggal(nilaiData, nomorDesil) {
	var desil = 0;

	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinDesil = nilaiData.join(";");

	$$("#desilTextArea").val(joinDesil);

	var letakDesil = (nomorDesil * (nilaiData.length + 1)) / 10;
	var lkX = Math.floor(letakDesil);
	var index = Math.floor(letakDesil);

	if(index == 0) {
		index = 1;
	}

	desil = (nilaiData[index-1]*1) + ((letakDesil - lkX) * (nilaiData[(index)] - nilaiData[index-1]));

	return getKoma(desil, dc);
}
function htmlDesilTunggal(nilaiData, nomorDesil) {
	var desil = 0;
	var html = "";

	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinDesil = nilaiData.join(";");

	$$("#desilTextArea").val(joinDesil);

	var letakDesil = (nomorDesil * (nilaiData.length + 1)) / 10;
	var lkX = Math.floor(letakDesil);
	var index = Math.floor(letakDesil);

	if(index == 0) {
		index = 1;
	}

	desil = (nilaiData[index-1]*1) + ((letakDesil - lkX) * (nilaiData[(index)] - nilaiData[index-1]));

	html = '<li><b>Langkah 1:</b><br> Urutkan data di atas dari nilai terkecil hingga nilai terbesar';
	html += '<li><b>Langkah 2:</b><br> Cari letak desil dengan persamaan <br>'+
	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/letak-desil.png"><br>'+
	'dimana: <br>'+
	'LDi = Letak desil ke-i<br>'+
	'i = bilangan bulat antara 1 sampai 9<br>'+
	'n = jumlah data<br>'+
	'Dari data di atas, letak desilnya adalah <br>'+
	'<b>('+nomorDesil+' * '+nilaiData.length+' + 1) / 10 = '+letakDesil+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Hasil desil tersebut dibagi menjadi 2 bagian, dimana bagian x '+
	'adalah bagian di depan angka desimal, sedangkan bagian y adalah bagian di belakang angka desimal<br>'+
	'DKi = x.y </li>';
	html += '<li><b>Langkah 4:</b><br> Cari nilai desil dengan persamaan <br>' +
	'<img id="desilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/desil.png"><br>'+
	'dimana: <br>' +
	'Di = nilai desil ke i <br>' + 
	'LDi = nilai letak desil ke-i <br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai desilnya adalah <br><b>' + 
	nilaiData[(index-1)]+' + (('+letakDesil+' - '+lkX+') * ('+nilaiData[(index)]+' - '+nilaiData[(index-1)]+
	')) = '+getKoma(desil, dc)+'</b></li>';

	return html;
}
function desilKelompok(arrayData, arrayFkk, nomorDesil, jenisVariabel){
	var letakDesil = getKoma(((nomorDesil*arrayFkk[arrayFkk.length-1]) / 10), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(letakDesil) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahDesil = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasDesil = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasDesil = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasDesil = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasDesil - batasBawahDesil), dc);

	//hitung Desil
	var desil = batasBawahDesil+(((parseFloat(letakDesil)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*parseFloat(interval));

	return getKoma(desil, dc);
}
function htmlDesilKelompok(arrayData, arrayFkk, nomorDesil, jenisVariabel) {
	var html = "";
	var letakDesil = getKoma(((nomorDesil*arrayFkk[arrayFkk.length-1]) / 10), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(letakDesil) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahDesil = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasDesil = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasDesil = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasDesil = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasDesil - batasBawahDesil), dc);

	//hitung Desil
	var desil = batasBawahDesil+(((parseFloat(letakDesil)-fkkSebelum)/arrayFkk[arrayFkk.length-1])*parseFloat(interval));
	
	html = '<li><b>Langkah 1:</b><br> Cari nilai desil dengan persamaan <br>' +
	'<img id="desilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/desil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Di = nilai desil ke-i <br>' +
	'Tb = tepi bawah kelas desil<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas desil<br>'+
  	'p = panjang kelas interval<br></li>';
  	html += '<li><b>Langkah 2:</b><br> Cari letak desil dengan nomor desil dikali dengan jumlah frekuensi, lalu dibagi 4. Hasil letak desil di atas adalah <b>('+nomorDesil+' * '+arrayFkk[arrayFkk.length-1]+') / 10 = '+letakDesil+'</b><br></li>';
  	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat letak desil termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas desil, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Tepi bawah kelas desil didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah desil adalah <b>'+batasBawahDesil+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> D('+nomorDesil+') = '+batasBawahDesil+' + (('+letakDesil+' - '+fkkSebelum+')/ '+arrayFkk[arrayFkk.length-1]+') * '+interval+' = '+getKoma(desil, dc)+'</b></li>';
	return html;
}
function persentilTunggal(nilaiData, nomorPersentil) {
	var html = "";
	var persentil = 0;
	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinPersentil = nilaiData.join(";");

	$$("#persentilTextArea").val(joinPersentil);

	var letakPersentil = (nomorPersentil * (nilaiData.length + 1)) / 100;
	var lkX = Math.floor(letakPersentil);
	var index = Math.floor(letakPersentil);

	if(index == 0) {
		index = 1;
	}

	persentil = (nilaiData[index-1]*1) + ((letakPersentil - lkX) * (nilaiData[(index)] - nilaiData[index-1]));
	return getKoma(persentil, dc);
}
function htmlPersentilTunggal(nilaiData, nomorPersentil) {
	var html = "";
	var persentil = 0;
	nilaiData.sort(function(a,b){
		return a-b;
	});
	var temp = document.getElementById(nilaiData);
	var joinPersentil = nilaiData.join(";");

	$$("#persentilTextArea").val(joinPersentil);

	var letakPersentil = (nomorPersentil * (nilaiData.length + 1)) / 100;
	var lkX = Math.floor(letakPersentil);
	var index = Math.floor(letakPersentil);

	if(index == 0) {
		index = 1;
	}

	persentil = (nilaiData[index-1]*1) + ((letakPersentil - lkX) * (nilaiData[(index)] - nilaiData[index-1]));

	html = '<li><b>Langkah 1:</b><br> Urutkan data di atas dari nilai terkecil hingga nilai terbesar';
	html += '<li><b>Langkah 2:</b><br> Cari letak persentil dengan persamaan <br>'+
	'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/letak-persentil.png"><br>'+
	'dimana: <br>'+
	'LPi = Letak persentil ke-i<br>'+
	'i = bilangan bulat antara 1 sampai 9<br>'+
	'n = jumlah data<br>'+
	'Dari data di atas, letak desilnya adalah <br>'+
	'<b>('+nomorPersentil+' * '+nilaiData.length+' + 1) / 100 = '+letakPersentil+'</b></li>';
	html += '<li><b>Langkah 3:</b><br> Hasil persentil tersebut dibagi menjadi 2 bagian, dimana bagian x '+
	'adalah bagian di depan angka desimal, sedangkan bagian y adalah bagian di belakang angka desimal<br>'+
	'PKi = x.y</li>';
	html += '<li><b>Langkah 4:</b><br> Cari nilai persentil dengan persamaan <br>' +
	'<img id="persentilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/persentil.png"><br>'+
	'dimana: <br>' +
	'Pi = nilai persentil ke-i <br>' +
	'LPi = nilai letak persentil ke-i <br>' + 
	'dx = nilai data ke-x <br>' +
	'Dari data di atas, nilai persentilnya adalah <br><b>' + 
	nilaiData[index-1]+' + (('+letakPersentil+' - '+lkX+') * ('+nilaiData[(index)]+' - '+nilaiData[index-1]+')) = '+getKoma(persentil, dc)+'</b></li>';

	return html;
}
function persentilKelompok(arrayData, arrayFkk, nomorPersentil, jenisVariabel){
	var letakPersentil = getKoma(((nomorPersentil*arrayFkk[arrayFkk.length-1]) / 100), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(letakPersentil) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahPersentil = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasPersentil = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasPersentil = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasPersentil = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasPersentil - batasBawahPersentil), dc);

	//hitung Persentil
	var persentil = batasBawahPersentil+(((parseFloat(letakPersentil)-fkkSebelum)/(arrayFkk[arrayFkk.length-1]))*parseFloat(interval));

	return getKoma(persentil, dc);
}
function htmlPersentilKelompok(arrayData, arrayFkk, nomorPersentil, jenisVariabel){
	var html = 0;
	var letakPersentil = getKoma(((nomorPersentil*arrayFkk[arrayFkk.length-1]) / 100), dc);
	var index = 0;
	for(var i=0; i<arrayFkk.length; i++) {
		if(parseFloat(letakPersentil) <= parseFloat(arrayFkk[i])) {
			index = i;
			break;
		}
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}
	//ambil fkk sebelumnya
	var fkkSebelum = 0;
	if(index-1 >= 0) {
		fkkSebelum = arrayFkk[index-1];
	}

	//ambil batas bawah, batas atas dan interval
	var batasBawahPersentil = parseFloat(arrayData[index].split('-')[0]);
	var batasAtasPersentil = 0;
	if(jenisVariabel == 'diskrit')
	{
		batasAtasPersentil = parseFloat(arrayData[index].split('-')[1])+1;
	}
	else if(jenisVariabel == 'kontinu')
	{
		batasAtasPersentil = parseFloat(arrayData[index].split('-')[1]);
	}
	var interval = getKoma((batasAtasPersentil - batasBawahPersentil), dc);

	//hitung Persentil
	var persentil = batasBawahPersentil+(((parseFloat(letakPersentil)-fkkSebelum)/(arrayFkk[arrayFkk.length-1]))*parseFloat(interval));

	html = '<li><b>Langkah 1:</b><br> Cari nilai persentil dengan persamaan <br>' +
	'<img id="persentilLangkahPengerjaan" style="width: 75%; padding-left: 12.5%; padding-top: 0px; padding-bottom: 0px;" src="img/persentil-berkelompok.png"><br>'+
	'dimana: <br>' +
	'Pi = nilai persentil ke-i <br>' +
	'Tb = tepi bawah kelas persentil<br>'+
  	'n = total frekuensi data berkelompok<br>'+
  	'fi = frekuensi kelas ke-i<br>'+
  	'fk = frekuensi kumulatif sebelum kelas persentil<br>'+
  	'p = panjang kelas interval<br></li>';
  	html += '<li><b>Langkah 2:</b><br> Cari letak persentil dengan nomor persentil dikali dengan jumlah frekuensi, lalu dibagi 4. Hasil letak persentil di atas adalah <b>('+nomorPersentil+' * '+arrayFkk[arrayFkk.length-1]+') / 100 = '+letakPersentil+'</b><br></li>';
  	html += '<li><b>Langkah 3:</b><br> Pada tabel, lihat kolom frekuensi kumulatif untuk melihat persentil termasuk dalam frekuensi kumulatif yang mana. Lalu ambil nilai frekuensi kumulatif sebelum kelas persentil, fk dari tabel di atas adalah <b>'+fkkSebelum+'</b></li>';
	html += '<li><b>Langkah 4:</b><br> Tepi bawah kelas persentil didapat dari batas bawah dikurangi 0.5 jika data diskrit. Jika data kontinu tepi bawahnya sama dengan batas bawah. Tepi bawah persentil adalah <b>'+batasBawahPersentil+'</b></li>';
	html += '<li><b>Langkah 5:</b><br> masukan semua nilai ke dalam rumus,<b> P('+nomorPersentil+') = '+batasBawahPersentil+' + (('+letakPersentil+' - '+fkkSebelum+')/ '+arrayFkk[arrayFkk.length-1]+') * '+interval+' = '+getKoma(persentil, dc)+'</b></li>';
	return html;
}
function varianTunggal(nilaiData, cekVarian) {
	var html = "";
	var varian = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;

	for(i = 0; i < nilaiData.length; i++) {
		sum += (parseFloat(nilaiData[i]));
	}

	var mean = sum/nilaiData.length;

	for(i = 0; i < nilaiData.length; i++) {
		pembilang += Math.pow((parseFloat(nilaiData[i]) - parseFloat(getKoma(mean, dc))),2); 
	}

	if(cekVarian == "sampel") {
		penyebut = (nilaiData.length) - 1;
		varian = getKoma(pembilang, dc) / penyebut;
	}
	else {
		penyebut = nilaiData.length;
		varian = getKoma(pembilang, dc) / penyebut;
	}
	return getKoma(varian, dc);
}
function hasilVarianFrekuensi(arrVariable, arrFrek, cekVarian) {
	var html = "";
	var varian = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;
	var totalFrek = 0;

	for(i = 0; i < arrVariable.length; i++) {
		sum += (parseFloat(arrVariable[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}

	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(arrVariable[i]) - parseFloat(getKoma(mean, dc)),2)*arrFrek[i];
	}

	if(cekVarian == "sampel") {
		penyebut = totalFrek - 1;
		varian = getKoma(pembilang, dc) / penyebut;
	}
	else {
		penyebut = totalFrek;
		varian = getKoma(pembilang, dc) / penyebut;
	}
	return getKoma(varian, dc);//tunggal frekuensi diketahui
}
function varianKelompok(arrVariable, arrFrek, cekVarian) {
	var sum = 0;
	var totalFrek = 0;
	var titikTengah = [];
	var pembilang = 0;
	var varianKelompok = 0;
	for(var i=0; i<arrVariable.length; i++)
	{
		var batasBawah = parseFloat(arrVariable[i].split('-')[0]);
		var batasAtas = parseFloat(arrVariable[i].split('-')[1]);
		titikTengah[i] = (batasAtas+batasBawah)/2;

		sum += (parseFloat(titikTengah[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}
	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(titikTengah[i]) - parseFloat(getKoma(mean, dc)),2)*parseInt(arrFrek[i]);
	}

	if(cekVarian == "sampel") {
		var varianPenyebut = totalFrek - 1;
		varianKelompok = pembilang / varianPenyebut;
	}
	else {
		var varianPenyebut = totalFrek;
		varianKelompok = pembilang / varianPenyebut;
	}
	return getKoma(varianKelompok, dc);
}
function htmlVarianKelompok(arrVariable, arrFrek, cekVarian) {
	var sum = 0;
	var totalFrek = 0;
	var titikTengah = [];
	var pembilang = 0;
	var varianKelompok = 0;
	for(var i=0; i<arrVariable.length; i++)
	{
		var batasBawah = parseFloat(arrVariable[i].split('-')[0]);
		var batasAtas = parseFloat(arrVariable[i].split('-')[1]);
		titikTengah[i] = (batasAtas+batasBawah)/2;

		sum += (parseFloat(titikTengah[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}
	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(titikTengah[i]) - parseFloat(getKoma(mean, dc)),2)*parseInt(arrFrek[i]);
	}

	if(cekVarian == "sampel") {
		var varianPenyebut = totalFrek - 1;
		varianKelompok = pembilang / varianPenyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian data berkelompok pengamatan sampel adalah <br>'+
			'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-berkelompok-sampel.png"><br>'+
			'dimana: <br>'+
			's^2 = varian sampel<br>'+
			'Xi = nilai data ke-i<br>'+
			'fi = frekuensi data ke-i<br>'+
			'X̄ = rata-rata sampel<br>'+
			'n = jumlah sampel <br> Anda bisa memakai salah satu persamaan di atas</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas.<b>Mean dari data di atas adalah = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Cari hasil jumlah <b>fi*(Xi-mean)^2 = '+getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 4:</b><br> Hitung total frekuensi atau jumlah sampel data berkelompok, lalu dikurangi 1 = <b>'+
		totalFrek+' - 1 = '+varianPenyebut+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Masukan hasil langkah 2-4 ke dalam persamaan, <b>'+getKoma(pembilang, dc)+' / '+varianPenyebut+' = '+getKoma(varianKelompok, dc)+'</b></li>';
	}
	else {
		var varianPenyebut = totalFrek;
		varianKelompok = pembilang / varianPenyebut;
		html = '<li><b>Langkah 1:</b><br> Persamaan varian data berkelompok pengamatan sampel adalah <br>'+
			'<img style="width:40%; padding-left: 30%; padding-top:0px; padding-bottom:0px;" src="img/varian-berkelompok-sampel.png"><br>'+
			'dimana: <br>'+
			's^2 = varian populasi<br>'+
			'Xi = nilai data ke-i<br>'+
			'fi = frekuensi data ke-i<br>'+
			'μ = rata-rata populasi<br>'+
			'N = jumlah populasi <br> Anda bisa memakai salah satu persamaan di atas</li>';
		html += '<li><b>Langkah 2:</b><br> Cari mean dari data di atas.<b>Mean dari data di atas adalah = '+getKoma(mean, dc)+' </b></li>';
		html += '<li><b>Langkah 3:</b><br> Cari hasil jumlah <b>fi*(Xi-mean)^2 = '+getKoma(pembilang, dc)+'</b></li>';
		html += '<li><b>Langkah 4:</b><br> Hitung total frekuensi atau jumlah sampel data berkelompok, lalu dikurangi 1 = <b>'+
		totalFrek+' - 1 = '+varianPenyebut+'</b></li>';
		html += '<li><b>Langkah 5:</b><br> Masukan hasil langkah 2-4 ke dalam persamaan, <b>'+getKoma(pembilang, dc)+' / '+varianPenyebut+' = '+getKoma(varianKelompok, dc)+'</b></li>';
	}
	return html;
}
function sdTunggal(nilaiData, cekSD) {
	var html = "";
	var sd = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;

	for(i = 0; i < nilaiData.length; i++) {
		sum += (parseFloat(nilaiData[i])); 
	}

	var mean = sum/nilaiData.length;

	for(i = 0; i < nilaiData.length; i++) {
		pembilang += Math.pow((parseFloat(nilaiData[i]) - parseFloat(getKoma(mean, dc))),2);
	}

	if(cekSD == "sampel") {
		penyebut = nilaiData.length - 1;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
	}
	else {
		penyebut = nilaiData.length;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
	}
	return getKoma(sd, dc);
}
function hasilSDFrekuensi(arrVariable, arrFrek, cekVarian) {
	var html = "";
	var varian = 0;
	var sum = 0;
	var pembilang = 0;
	var penyebut = 0;
	var sd = 0;
	var totalFrek = 0;

	for(i = 0; i < arrVariable.length; i++) {
		sum += (parseFloat(arrVariable[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}

	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(arrVariable[i]) - parseFloat(getKoma(mean, dc)),2)*arrFrek[i];
	}

	if(cekVarian == "sampel") {
		penyebut = totalFrek - 1;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
	}
	else {
		penyebut = totalFrek;
		sd = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
	}
	return getKoma(sd, dc);
}
function sdKelompok(arrVariable, arrFrek, cekVarian) {
	var sum = 0;
	var totalFrek = 0;
	var titikTengah = [];
	var pembilang = 0;
	var penyebut = 0;
	var sdKelompok = 0;

	for(var i=0; i<arrVariable.length; i++)
	{
		var batasBawah = parseFloat(arrVariable[i].split('-')[0]);
		var batasAtas = parseFloat(arrVariable[i].split('-')[1]);
		titikTengah[i] = (batasAtas+batasBawah)/2;

		sum += (parseFloat(titikTengah[i])*parseInt(arrFrek[i]));
		totalFrek += parseInt(arrFrek[i]);
	}
	var mean = sum/totalFrek;

	for(i = 0; i < arrVariable.length; i++) {
		pembilang += Math.pow(parseFloat(titikTengah[i]) - parseFloat(getKoma(mean, dc)),2)*parseInt(arrFrek[i]);
	}

	if(cekVarian == "sampel") {
		penyebut = totalFrek - 1;
		sdKelompok = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
	}
	else {
		penyebut = totalFrek;
		sdKelompok = Math.sqrt(parseFloat(getKoma(pembilang, dc)) / penyebut);
	}
	return getKoma(sdKelompok, dc);
}

//FUNCTION RANDOM INPUT
function randomKualitatifVariabel(jumlahVariabel, angka) {
	var arrayBuah = ['Apel','Jeruk','Mangga','Pir','Kiwi','Melon','Anggur','Sirsak','Leci','Duku', 'Ceri', 'Labu', 'Naga', 'Nanas', 'Jambu', 'Ara', 'Bit', 'Enau', 'Kurma', 'Salak', 'Sawo', 'Tomat', 'Timun', 'Arbei'];
  	var arrayHewan = ['Ayam', 'Sapi', 'Kuda', 'Rusa', 'Itik', 'Ular', 'Zebra', 'Anoa', 'Tawon', 'Unta', 'Macan', 'Semut', 'Babi', 'Belut', 'Buaya', 'Cicak', 'Bebek', 'Domba', 'Gajah', 'Hiena', 'Katak'];
  	var arrayWarna = ['Merah', 'Kuning', 'Hijau', 'Biru', 'Ungu', 'Putih', 'Hitam'];
  	var tampungKata = [];

  	if(angka == 1) {
  		shuffle(arrayBuah);
  		for(var i=0; i<jumlahVariabel; i++){
  			tampungKata.push(arrayBuah[i]);
  		}
  	}
  	else if(angka == 2) {
  		shuffle(arrayHewan);
  		for(var i=0; i<jumlahVariabel; i++){
  			tampungKata.push(arrayHewan[i]);
  		}
  	}
  	else if(angka == 3) {
  		shuffle(arrayWarna);
  		for(var i=0; i<jumlahVariabel; i++){
  			tampungKata.push(arrayWarna[i]);
  		}
  	}
  	return tampungKata;
}
function randomKualitatif(jumlahData, angka) {

  	var arrayBuah = ['Apel','Jeruk','Mangga','Pir','Kiwi','Melon','Anggur','Sirsak','Leci','Duku', 'Ceri', 'Labu', 'Naga', 'Nanas', 'Jambu', 'Ara', 'Bit', 'Enau', 'Kurma', 'Salak', 'Sawo', 'Tomat', 'Timun', 'Arbei'];
  	var arrayHewan = ['Ayam', 'Sapi', 'Kuda', 'Rusa', 'Itik', 'Ular', 'Zebra', 'Anoa', 'Tawon', 'Unta', 'Macan', 'Semut', 'Babi', 'Belut', 'Buaya', 'Cicak', 'Bebek', 'Domba', 'Gajah', 'Hiena', 'Katak'];
  	var arrayWarna = ['Merah', 'Kuning', 'Hijau', 'Biru', 'Ungu', 'Putih', 'Hitam'];
  	var tampungKata = [];
  	var index = 0;

  	if(angka == 1) {
  		while(index < jumlahData) //ambil buah sejumlah baris yang tersedia
	  	{
	   		var fruit = arrayBuah[Math.floor(Math.random()*arrayBuah.length)];
	   		tampungKata[index] = fruit;
	    	index++;
		}
  	}
  	else if(angka == 2) {
  		while(index < jumlahData) //ambil buah sejumlah baris yang tersedia
	  	{
	   		var animal = arrayHewan[Math.floor(Math.random()*arrayHewan.length)];
	   		tampungKata[index] = animal;
	    	index++;
		}
  	}
  	else if(angka == 3) {
  		while(index < jumlahData) //ambil buah sejumlah baris yang tersedia
	  	{
	   		var warna = arrayWarna[Math.floor(Math.random()*arrayWarna.length)];
	   		tampungKata[index] = warna;
	    	index++;
		}
  	}
  	
	return tampungKata;
}
function randomSoalDataTunggalDiskrit(randomAwal, jumlahData, interval){
	var strData = "";
	var min=randomAwal;
	var max=randomAwal+interval;
	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
    	var random = Math.floor(Math.random() * (+max - +min)) + +min;
    	if(i < jumlahData)
		{
			strData += random+',';
		}
		else if(i == jumlahData)
		{
			strData += random;
		}

		//Update nilai min dan max
		min = random+1;
		max = min+interval;
	}
	return strData;
}
function randomSoalDataULTunggalDiskrit(nilaiMin, nilaiMax, jumlahData){
	var strData = "";
	var min=nilaiMin;
	var max=nilaiMax;

	// var genRandom =Math.ceil(Math.random() * (2 - 0)) + 0;
	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
	    var random = Math.floor(Math.random() * (+max - +min)) + +min;
	    if(i < jumlahData)
		{
			strData += random+',';
		}
		else if(i == jumlahData)
		{
			strData += random;
		}
	}
	return strData;
}
function randomSoalDataULTunggalKontinu(nilaiMin, nilaiMax, jumlahData, pengali){
	var strData = "";
	var min=nilaiMin;
	var max=nilaiMax;

	// var genRandom =Math.ceil(Math.random() * (2 - 0)) + 0;
	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
	    var random = Math.floor(Math.random() * (+max - +min)) + +min;
	    var hasilKali = random * parseFloat(pengali);
	    if(i < jumlahData)
		{
			strData += hasilKali.toFixed(1)+',';
		}
		else if(i == jumlahData)
		{
			strData += hasilKali.toFixed(1);
		}
	}
	return strData;
}
function randomSoalDataTunggalKontinu(randomAwal, jumlahData, interval, pengali){
	var strData = "";
	var min=randomAwal;
	var max=randomAwal+interval;
	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
    	var random = (Math.floor(Math.random() * (+max - +min)) + +min);
    	var hasilKali = random * parseFloat(pengali);
    	if(i < jumlahData)
		{
			strData += hasilKali.toFixed(1)+',';
		}
		else if(i == jumlahData)
		{
			strData += hasilKali.toFixed(1);
		}

		//Update nilai min dan max
		min = random+1;
		max = min+interval;
	}
	return strData;
}
function randomSoalDataKelompokDiskrit(nilaiAwal, jumlahData, maxRandom){
	var strData = "";
	var min=nilaiAwal;
	var max=nilaiAwal+maxRandom;  
	var nilaiBawah = Math.floor(Math.random() * (+max - +min)) + +min;

	var min2 = nilaiBawah;
	var max2 = nilaiBawah+maxRandom;
	var nilaiAtas = Math.floor(Math.random() * (+max2 - +min2)) + +min2;
	var selisih = nilaiAtas - nilaiBawah;

	// alert(nilaiBawah+'-'+nilaiAtas+','+selisih);

	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
		if(i < jumlahData)
		{
			strData += nilaiBawah+'-'+nilaiAtas+',';
		}
		else if(i == jumlahData)
		{
			strData += nilaiBawah+'-'+nilaiAtas;
		}
		nilaiBawah = nilaiAtas+1;
		nilaiAtas = nilaiBawah+selisih;
	}
	return strData;
}
function randomSoalDataKelompokKontinu(nilaiAwal, jumlahData, maxRandom, pengali){
	var strData = "";
	var min=nilaiAwal;
	var max=nilaiAwal+maxRandom;  
	var nilaiBawah = Math.floor(Math.random() * (+max - +min)) + +min;
	var nilaiBawahFix = nilaiBawah * parseFloat(pengali);

	var min2 = nilaiBawah;
	var max2 = nilaiBawah+maxRandom;
	var nilaiAtas = Math.floor(Math.random() * (+max2 - +min2)) + +min2;
	var nilaiAtasFix = nilaiAtas * parseFloat(pengali);
	var selisih = nilaiAtasFix - nilaiBawahFix;

	// alert(nilaiBawah+'-'+nilaiAtas+','+selisih);

	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
		if(i < jumlahData)
		{
			strData += nilaiBawahFix.toFixed(1)+'-'+nilaiAtasFix.toFixed(1)+',';
		}
		else if(i == jumlahData)
		{
			strData += nilaiBawahFix.toFixed(1)+'-'+nilaiAtasFix.toFixed(1);
		}
		nilaiBawahFix = nilaiAtasFix;
		nilaiAtasFix = nilaiBawahFix+selisih;
	}
	return strData;
}
function randomDataModusKontinu(jumlahData, minRandom, maxRandom){ 
	var strFrekuensi = "";
	var min=minRandom;
	var max=maxRandom;
	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
    	var random = Math.floor(Math.random() * (+max - +min)) + +min;
    	var hasilKali = random*0.1;
    	if(i < jumlahData)
		{
			strFrekuensi += hasilKali.toFixed(1)+',';
		}
		else if(i == jumlahData)
		{
			strFrekuensi += hasilKali.toFixed(1);
		}
	}
	return strFrekuensi;
}
function randomFrekuensi(jumlahData, minRandom, maxRandom){ 
	var strFrekuensi = "";
	var min=minRandom;
	var max=maxRandom;
	for(var i=1; i<=jumlahData; i++)
	{
		//update nilai variabel
    	var random = Math.floor(Math.random() * (+max - +min)) + +min;
    	if(i < jumlahData)
		{
			strFrekuensi += random+',';
		}
		else if(i == jumlahData)
		{
			strFrekuensi += random;
		}
	}
	return strFrekuensi;
}
function randomOpsi(minRandom, maxRandom, jawaban, tipe) {
	var min=parseFloat(jawaban)-minRandom;
	var max=parseFloat(jawaban)+maxRandom;
	var arrOpsi = [];
	var success = 0;
	while(success < 3) //opsi lain cuma 3
	{
		if(tipe == "diskrit")
		{
			// saya ngopas dari stackoverflow
			var random = Math.floor(Math.random() * (+max - +min)) + +min;
		}
		else if(tipe == "kontinu")
		{
			var random = Math.random() * (+max - +min) + +min;
			random =  parseFloat(random.toFixed(3));
		}

		if(random < 0)
		{
			random *= -1;
		}

		var available = false;
		for(var j=0; j<arrOpsi.length; j++)
		{
			if(random == arrOpsi[j]) //already available
			{
				available = true;
				break;
			}
		}

		if(!available && random != jawaban)
		{
			arrOpsi[success] = random;
			success++;
		}
	}
	return arrOpsi;
}
function randomOpsiGrafik(arrVariable, frekuensi) {	
	var arrGrafik = new Array();

	//opsi 1
	var arrObject = new Array();
  	for(var i=0; i<arrVariable.length; i++){
  		var obj = new Object();
  		obj.variable = arrVariable[i];
  		obj.value = frekuensi[i];
  		obj.jawaban = true;
  		arrObject.push(obj);
  	}
	arrGrafik[0] = arrObject;

	//opsi 2
	var randFrekuensi = shuffle(frekuensi); //random frekuensi untuk opsi kedua
	var arrObject2 = new Array();
	for(var i=0; i<arrVariable.length; i++){
		var obj = new Object();
  		obj.variable = arrVariable[i];
  		obj.value = randFrekuensi[i];
  		obj.jawaban = false;
  		arrObject2.push(obj);
  	}
	arrGrafik[1] = arrObject2;

  	return arrGrafik;
}
function randomOpsiVariable(minRandom, maxRandom, jawaban, tipe) {
	var tempBawah = parseFloat(jawaban.split('-')[0]);
	var tempAtas = parseFloat(jawaban.split('-')[1]);
	var selisih = tempAtas - tempBawah;
	var min=parseFloat(tempBawah)-minRandom;
	var max=parseFloat(tempBawah)+maxRandom;
	var arrOpsi = [];
	var success = 0;
	while(success < 3) //opsi lain cuma 3
	{
		if(tipe == "diskrit")
		{
			var random = Math.floor(Math.random() * (+max - +min)) + +min;
		}
		else if(tipe == "kontinu")
		{
			var random = Math.random() * (+max - +min) + +min;
			random =  parseFloat(random.toFixed(3));
		}

		var availableOrMinus = false;
		for(var j=0; j<arrOpsi.length; j++)
		{
			if(random == arrOpsi[j] || random < 0) //already avaailable or value minus
			{
				availableOrMinus = true;
				break;
			}
		}

		if(!availableOrMinus)
		{
			var atas = random+selisih;
			arrOpsi[success] = random+"-"+atas;
			success++;
		}
	}
	return arrOpsi;
}
function randomOpsiModus(arrData, arrJawaban){
	var arrOpsi = [];
	if(arrJawaban.length == 1)
	{	
		var success = false;
		while(!success)
		{
			shuffle(arrData);
			if(arrData[0] != arrJawaban[0] && arrData[1] != arrJawaban[0] && arrData[2] != arrJawaban[0])
			{
				arrOpsi[0] = arrData[0];
				arrOpsi[1] = arrData[1];
				arrOpsi[2] = arrData[2];
				success = true;
			}
		}
		
	}
	else
	{
		for(var i=0; i<3; i++)
		{
			shuffle(arrData);
			var strOpsi = "";
			for(var j=0; j<arrJawaban.length; j++)
			{
				if(j < arrJawaban.length-1)
				{
					strOpsi += arrData[j]+'&';
				}
				else if(j == arrJawaban.length-1)
				{
					strOpsi += arrData[j];
				}
			}
			arrOpsi[i] = strOpsi;
		}
		
	}
	return arrOpsi;
}
function shuffle(arrObject){
    var j, x, i;
    for (i = arrObject.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arrObject[i];
        arrObject[i] = arrObject[j];
        arrObject[j] = x;
    }
    return arrObject;
}
function ulPersen(nomor, jenis) {
	var persen = 0;
    if(jenis == "kuartil") {
    	if(randomNomorUL == 1) {
			persen = 25;
		}
		else if(randomNomorUL == 2) {
			persen = 50;
		}
		else {
			persen = 75;
		}
    }
    return persen;
}
class objSoal{
	constructor(soal, arrOpsi, jawaban, langkahKerja) {
        this.soal = soal;
        this.arrOpsi = arrOpsi;
        this.jawaban = jawaban;
        this.langkahKerja = langkahKerja;
    }
}

// FUNCTION LATIHAN SOAL
function nomorSoal(idx, numSoal) {
	 for (var i=1;i<=numSoal;i++)
	 {
	  	$$(".csoal"+i).hide();
	 }
	 $$(".csoal"+idx).show();
}

// FUNCTION AKHIRI SOAL
function ambilTipeSoal(items){
	for(var i=0; i<items.length; i++){
		if(items[i] == "lsDF" || items[i] == "ruDF")
		{
			items[i] = "Distribusi Frekuensi";
		}
		else if(items[i] == "lsGrafik" || items[i] == "ruGrafik")
		{
			items[i] = "Grafik";
		}
		else if(items[i] == "lsUKP" || items[i] == "ruUKP")
		{
			items[i] = "Ukuran Pemusatan Data";
		}
		else if(items[i] == "lsUL" || items[i] == "ruUL")
		{
			items[i] = "Ukuran Lokasi";
		}
		else if(items[i] == "lsUPD" || items[i] == "ruUPD")
		{
			items[i] = "Ukuran Penyebaran Data";
		}
	}
	return items;
}

var arrSoalDF = [];

var arrSoalHisto = [];
var arrSoalPoligon = [];
var arrSoalLingkaran = [];
var arrSoalBatang = [];

var arrSoalMean = [];
var arrSoalMedian = [];
var arrSoalModus = [];

var arrSoalKuartil = [];
var arrSoalDesil = [];
var arrSoalPersentil = [];

var arrSoalVarian = [];
var arrSoalSD = [];

var arrFrekuensi = [];
var arrOpsi = [];
var randomNomorUL = 0;
var randomData = 0;
var frekuensi = 0;
var soal = 0;

// ------- PERKUMPULAN PARA PEMBUAT SOAL ------- //
function dfPertanyaan(randomPertanyaan) {
	var tanya = "";
	if(randomPertanyaan == 1) {
		tanya = "variabel";
	}
	else if (randomPertanyaan == 2) {
		tanya = "titik tengah";
	}
	else if (randomPertanyaan == 3) {
		tanya = "frekuensi";
	}
	else if (randomPertanyaan == 4) {
		tanya = "frekuensi kumulatif";
	}
	else {
		tanya = "persen frekuensi kumulatif";
	}
	return tanya;
}
function buatSoalDF() { 
	
	//DF: soal1
	var randomPertanyaan = Math.floor(Math.random() * (6 - 1)) + 1;
	var tanya = dfPertanyaan(randomPertanyaan);
	randomData = randomSoalDataULTunggalDiskrit(100, 170, 30); //0.1 pengali: angka belakang komanya berapa, ex: 90.25 itu param 4 nya 0.25
	arrData = randomData.split(',');
	var df = dfFunction("diskrit", randomPertanyaan, arrData);
	// alert(df);
	var indexJawaban = Math.floor(Math.random() * (df.length - 1)) + 1;
	var jawaban = df[indexJawaban-1];
	if(randomPertanyaan == 3 || randomPertanyaan == 4)
	{
		arrOpsi = randomOpsi(10,10,jawaban,"diskrit");
	}
	else if(randomPertanyaan == 1)
	{
		arrOpsi = randomOpsiVariable(10,10,jawaban,"diskrit");
	}
	else
	{
		arrOpsi = randomOpsi(10,10,jawaban,"kontinu");
	}
	soal = "Besarnya modal dalam jutaan rupiah dari 30 perusahaan nasional pada suatu daerah tertentu adalah sebagai berikut:\n"+
		randomData+"\nJika data tersebut dalam bentuk berkelompok, berapakah "+tanya+" ke-"+indexJawaban+" dari data tersebut?";
	arrFrekuensi = [];
	html = htmlDFFunction("diskrit",randomPertanyaan,arrData,df,indexJawaban);
	arrSoalDF[0] = new objSoal(soal,arrOpsi,jawaban,html);

	//DF: soal2
	randomPertanyaan = Math.floor(Math.random() * (6 - 1)) + 1;
	tanya = dfPertanyaan(randomPertanyaan);
	randomData = randomSoalDataULTunggalDiskrit(60, 100, 30); //0.1 pengali: angka belakang komanya berapa, ex: 90.25 itu param 4 nya 0.25
	arrData = randomData.split(',');
	df = dfFunction("diskrit", randomPertanyaan, arrData);
	// alert(df);
	indexJawaban = Math.floor(Math.random() * (df.length - 1)) + 1;
	jawaban = df[indexJawaban-1];
	if(randomPertanyaan == 3 || randomPertanyaan == 4)
	{
		arrOpsi = randomOpsi(10,10,jawaban,"diskrit");
	}
	else if(randomPertanyaan == 1)
	{
		arrOpsi = randomOpsiVariable(10,10,jawaban,"diskrit");
	}
	else
	{
		arrOpsi = randomOpsi(10,10,jawaban,"kontinu");
	}
	soal = "Berat badan dalam kg dari 30 mahasiswa Universitas JKL adalah sebagai berikut:\n"+
		randomData+".\nBuatlah tabel frekuensi dengan data dikelompokan dan tentukan "+tanya+" ke-"+indexJawaban+" dari data tersebut?";
	arrFrekuensi = [];
	html = htmlDFFunction("diskrit",randomPertanyaan,arrData,df,indexJawaban);
	arrSoalDF[1] = new objSoal(soal,arrOpsi,jawaban,html);

	//DF: soal3
	randomPertanyaan = Math.floor(Math.random() * (6 - 1)) + 1;
	tanya = dfPertanyaan(randomPertanyaan);
	randomData = randomSoalDataULTunggalKontinu(300, 1000, 25, 0.1); //0.1 pengali: angka belakang komanya berapa, ex: 90.25 itu param 4 nya 0.25
	arrData = randomData.split(',');
	df = dfFunction("kontinu", randomPertanyaan, arrData);
	// alert(df);
	indexJawaban = Math.floor(Math.random() * (df.length - 1)) + 1;
	jawaban = df[indexJawaban-1];
	if(randomPertanyaan == 3 || randomPertanyaan == 4)
	{
		arrOpsi = randomOpsi(10,10,jawaban,"diskrit");
	}
	else if(randomPertanyaan == 1)
	{
		arrOpsi = randomOpsiVariable(10,10,jawaban,"kontinu");
	}
	else
	{
		arrOpsi = randomOpsi(10,10,jawaban,"kontinu");
	}
	soal = "Hasil ujian matematika siswa SMP C yang dikelompokan adalah sebagai berikut:\n"+
		randomData+".\nDari data tersebut, tentukan "+tanya+" ke-"+indexJawaban+"?";
	arrFrekuensi = [];
	html = htmlDFFunction("kontinu",randomPertanyaan,arrData,df,indexJawaban);
	arrSoalDF[2] = new objSoal(soal,arrOpsi,jawaban,html);

	//DF: soal4
	arrData = randomKualitatif(25, 1); //0.1 pengali: angka belakang komanya berapa, ex: 90.25 itu param 4 nya 0.25
	// alert(df);
	index = Math.floor(Math.random() * (arrData.length - 1)) + 1;
	var buah = arrData[index-1];
	jawaban = dfFunctionTunggal(arrData, buah);
	arrOpsi = randomOpsi(10,10,jawaban,"diskrit");
	soal = "Diketahui buah yang disukai 25 siswa SD ABC adalah sebagai berikut:\n"+
		arrData+".\nDari data tersebut, tentukan frekuensi buah "+buah +"?";
	arrFrekuensi = [];
	html = htmlDFFunctionTunggal(arrData, buah);
	arrSoalDF[3] = new objSoal(soal,arrOpsi,jawaban,html);

	//DF: soal5
	randomData = randomSoalDataULTunggalDiskrit(1,5,30);
	arrData = randomData.split(',');
	// alert(df);
	index = Math.floor(Math.random() * (arrData.length - 1)) + 1;
	var rating = arrData[index-1];
	jawaban = dfFunctionTunggal(arrData, rating);
	arrOpsi = randomOpsi(10,10,jawaban,"diskrit");
	soal = "Diketahui rating seorang driver ojek online adalah sebagai berikut:\n"+
		arrData+".\nDari data tersebut, tentukan frekuensi driver yang memiliki rating "+rating +"?";
	arrFrekuensi = [];
	html = htmlDFFunctionTunggal(arrData, rating);
	arrSoalDF[4] = new objSoal(soal,arrOpsi,jawaban,html);

	// for(var i=0; i<arrSoalDF.length; i++){
	// 	alert((i+1)+arrSoalDF[i].soal + ' - '+arrSoalDF[i].arrOpsi+' - '+arrSoalDF[i].jawaban+'\n\n'+arrSoalDF[i].langkahKerja);
	// }
}
// buatSoalDF();
function buatSoalGrafik() {
	//Grafik: soal1 - histogram
	var randomData = randomSoalDataTunggalDiskrit(17,5,1);
	var frekuensi = randomFrekuensi(5,1,10);
	var arrData = randomData.split(',');
	var arrFrekuensi = frekuensi.split(',');
	// var grafik = grafikTunggal(arrData, arrFrekuensi);
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Diketahui sampel umur mahasiswa Universitas Y adalah sebagai berikut<br>"+
		"Umur: "+randomData+
		"<br>Jumlah mahasiswa:"+frekuensi+
		"<br> Maka grafik histogram yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah kelas variabel yang diamati</li>';
		html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';
	arrSoalHisto[0] = new objSoal(soal,arrOpsi,"grafik-histogram",html);

	//Grafik: soal2 - histogram
	var randomData = randomSoalDataTunggalDiskrit(168,4,5);
	var frekuensi = randomFrekuensi(4,1,10);
	var arrData = randomData.split(',');
	var arrFrekuensi = frekuensi.split(',');
	// var grafik = grafikTunggal(arrData, arrFrekuensi);
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Diketahui sampel tinggi badan pemain basket SMA Z adalah sebagai berikut<br>"+
		"Tinggi badan (cm): "+randomData+
		"<br>Jumlah siswa:"+frekuensi+
		"<br> Maka grafik histogram yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah kelas variabel yang diamati</li>';
		html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';
	arrSoalHisto[1] = new objSoal(soal,arrOpsi,"grafik-histogram",html);

	//Grafik: soal1 - lingkaran
	var arrData = randomKualitatifVariabel(5,1);
	var frekuensi = randomFrekuensi(5,1,10);
	var arrFrekuensi = frekuensi.split(',');
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Diketahui penjualan buah seorang pedagang buah dalam sehari adalah sebagai berikut<br>"+
		"Buah: "+arrData+
		"<br>Jumlah penjualan:"+frekuensi+
		"<br> Maka diagram lingkaran yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Cek data apakah sudah frekuensi sudah dalam bentuk presentase atau belum, jika belum ubah semua frekuensi data tersebut ke dalam bentuk persentase dengan cara data ke-x dibagi total frekuensi dikali 100%</li>';
		html += '<li><b>Langkah 2:</b><br> Mencari besar sudut yang mewakili nilai masing-masing data dengan cara banyak data ke-x dibagi total frekuensi dikali 360 derajat</li>';
		html += '<li><b>Langkah 3:</b><br> Gambar grafik dengan bantuan sudut penggaris</li>';
		html += '<li><b>Langkah 4:</b><br> Tuliskan keterangan pada daerah dalam diagram berupa nama variabel dan persentasenya</li>';
	arrSoalLingkaran[0] = new objSoal(soal,arrOpsi,"grafik-lingkaran",html);

	//Grafik: soal3 - lingkaran
	var arrData = randomKualitatifVariabel(4,1);
	var frekuensi = randomFrekuensi(4,3,12);
	var arrFrekuensi = frekuensi.split(',');
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Diketahui jumlah ibu-ibu berbelanja buah di Toko ABC adalah sebagai berikut<br>"+
		"Buah: "+arrData+
		"<br>Jumlah penjualan:"+frekuensi+
		"<br> Maka diagram lingkaran yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Cek data apakah sudah frekuensi sudah dalam bentuk presentase atau belum, jika belum ubah semua frekuensi data tersebut ke dalam bentuk persentase dengan cara data ke-x dibagi total frekuensi dikali 100%</li>';
		html += '<li><b>Langkah 2:</b><br> Mencari besar sudut yang mewakili nilai masing-masing data dengan cara banyak data ke-x dibagi total frekuensi dikali 360 derajat</li>';
		html += '<li><b>Langkah 3:</b><br> Gambar grafik dengan bantuan sudut penggaris</li>';
		html += '<li><b>Langkah 4:</b><br> Tuliskan keterangan pada daerah dalam diagram berupa nama variabel dan persentasenya</li>';
	arrSoalLingkaran[1] = new objSoal(soal,arrOpsi,"grafik-lingkaran",html);

	//Grafik: soal1 - batang
	var arrData = randomKualitatifVariabel(5,2);
	var frekuensi = randomFrekuensi(5,1,15);
	var arrFrekuensi = frekuensi.split(',');
	// var grafik = grafikTunggal(arrData, arrFrekuensi);
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Berikut ini adalah data jumlah hewan yang terdapat di kebun binatang XYZ<br>"+
		"Nama binatang: "+arrData+
		"<br>Jumlah:"+frekuensi+
		"<br> Maka grafik batang yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi variabel yang diamati</li>';
		html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';
	arrSoalBatang[0] = new objSoal(soal,arrOpsi,"grafik-batang",html);

	//Grafik: soal3 - batang
	var arrData = randomKualitatifVariabel(4,2);
	var frekuensi = randomFrekuensi(4,1,10);
	var arrFrekuensi = frekuensi.split(',');
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Berikut ini adalah sampel 4 binatang kesukaan siswa SD ABC"+
		"Nama binatang: "+arrData+
		"<br>Jumlah siswa:"+frekuensi+
		"<br> Maka grafik batang yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi variabel yang diamati</li>';
		html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';
	arrSoalBatang[1] = new objSoal(soal,arrOpsi,"grafik-batang",html);

	//Grafik: soal1 - poligon
	var arrData = ["2016","2017","2018","2019"];
	var frekuensi = randomFrekuensi(arrData.length,100,200);
	var arrFrekuensi = frekuensi.split(',');
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Berikut ini adalah data mahasiswa Fakultas Hukum Universitas G pada tahun "+arrData+
		"<br>Jumlah mahasiswa:"+frekuensi+
		"<br> Maka grafik poligon yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Cari titik tengah tiap kelas.</li>';
		html += '<li><b>Langkah 2:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah tiap kelas</li>';
		html += '<li><b>Langkah 3:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Titik dibuat setinggi frekuensi tiap kelas, lalu tarik garis antar titik yang dibuat</li>';
	arrSoalPoligon[0] = new objSoal(soal,arrOpsi,"grafik-garis",html);

	//Grafik: soal2 - poligon
	var arrData = ["2015","2016","2017","2018", "2019"];
	var frekuensi = randomFrekuensi(arrData.length,30,50);
	var arrFrekuensi = frekuensi.split(',');
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Berikut ini adalah data tahunan penjualan komputer pada Toko JK <br>"+
		"Tahun: "+arrData+
		"<br>Jumlah komputer:"+frekuensi+
		"<br> Maka grafik poligon yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Cari titik tengah tiap kelas.</li>';
		html += '<li><b>Langkah 2:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah tiap kelas</li>';
		html += '<li><b>Langkah 3:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Titik dibuat setinggi frekuensi tiap kelas, lalu tarik garis antar titik yang dibuat</li>';
	arrSoalPoligon[1] = new objSoal(soal,arrOpsi,"grafik-garis",html);

	//Grafik: soal2 - poligon
	var arrData = ["1","2","3","4", "5", "6"];
	var frekuensi = randomFrekuensi(arrData.length,6,13);
	var arrFrekuensi = frekuensi.split(',');
	var arrOpsi = randomOpsiGrafik(arrData, arrFrekuensi);
	var soal = "Berikut ini adalah data bulanan penjualan makaroni pedas manis pada Toko MN <br>"+
		"Bulan: "+arrData+
		"<br>Penghasilan (juta):"+frekuensi+
		"<br> Maka grafik poligon yang tepat untuk data di atas adalah..";
	var html = '<li><b>Langkah 1:</b><br> Cari titik tengah tiap kelas.</li>';
		html += '<li><b>Langkah 2:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah tiap kelas</li>';
		html += '<li><b>Langkah 3:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
		html += '<li><b>Langkah 4:</b><br> Titik dibuat setinggi frekuensi tiap kelas, lalu tarik garis antar titik yang dibuat</li>';
	arrSoalPoligon[2] = new objSoal(soal,arrOpsi,"grafik-garis",html);

}
function buatSoalUKP() { 
	//Mean: soal1
	randomData = randomSoalDataTunggalDiskrit(3,6,1);
	frekuensi = randomFrekuensi(6,1,20);
	var arrData = randomData.split(',');
	var arrFrekuensi = frekuensi.split(',');
	soal = "Nilai ujian psikotest peserta seleksi karyawan suatu perusahaan diperlihatkan pada tabel berikut:\nNilai ujian: "+randomData+"\nfrekuensi: "+frekuensi+"\nJika peserta yang dinyatakan lulus hanya peserta yang Nilainya lebih besar dari nilai rata-rata maka banyak peserta yang lulus adalah?";
	var mean = meanTunggal(arrData, arrFrekuensi);
	var jumlahLulus = 0; //jawaban
	for(var i=0; i<arrData.length; i++){
		if(parseFloat(arrData[i]) > mean){
			jumlahLulus += parseInt(arrFrekuensi[i]);
		}
	}
	arrOpsi = randomOpsi(10,10,jumlahLulus,"diskrit");
	var html = htmlMean(arrData, arrFrekuensi, "tunggal");
	html += '<li><b>Langkah 3:</b><br> Dari mean tersebut, jumlah peserta yang nilainya lebih dari rata-rata adalah <b>'+jumlahLulus+'</b></li>';
	arrSoalMean[0] = new objSoal(soal,arrOpsi,jumlahLulus,html);


	//Mean: soal2
	randomData = randomSoalDataTunggalKontinu(600,8,50,0.1); //0.1 pengali: angka belakang komanya berapa, ex: 90.25 itu param 4 nya 0.25
	arrData = randomData.split(',');
	mean = meanTanpaFrekuensi(arrData,"kontinu");
	arrOpsi = randomOpsi(10,10,mean,"kontinu");
	soal = "Hasil ujian statistika seorang mahasiswa Teknik Informatika didapati seperti berikut ini:\n"+randomData+"\nHitung mean dari data diatas?";
	arrFrekuensi = [];
	html = htmlMean(arrData, arrFrekuensi, "tunggal");
	arrSoalMean[1] = new objSoal(soal,arrOpsi,mean,html);
	
	//Mean: soal3
	randomData = randomSoalDataTunggalDiskrit(40,5,10);
	frekuensi = randomFrekuensi(5,1,10);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	mean = meanTunggal(arrData, arrFrekuensi);
	arrOpsi = randomOpsi(10,10,mean,"kontinu");
	soal = "Berapa rata-rata hitung tabel frekuensi data tunggal berikut ini:\nXi: "+randomData+"\nfi: "+frekuensi+"\nHitung mean dari data diatas?";
	html = htmlMean(arrData, arrFrekuensi, "tunggal"); 
	arrSoalMean[2] = new objSoal(soal,arrOpsi,mean,html);

	//Mean: soal4
	randomData = randomSoalDataKelompokDiskrit(30,6,10);
	frekuensi = randomFrekuensi(6,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	mean = meanKelompok(arrData, arrFrekuensi);
	arrOpsi = randomOpsi(10,10,mean,"kontinu");
	soal = "Berikut ini adalah tabel hasil nilai ujian kalkulus sejumlah mahasiswa yang sudah disusun dalam tabel frekuensi.\nNilai ujian: "+randomData+"\nJumlah siswa: "+frekuensi+"\nHitung mean dari data diatas?";
	html = htmlMean(arrData, arrFrekuensi, "kelompok"); 
	arrSoalMean[3] = new objSoal(soal,arrOpsi,mean,html); 

	//Mean: soal5
	randomData = randomSoalDataTunggalKontinu(600,10,50,0.1);
	arrData = randomData.split(',');
	mean = meanTanpaFrekuensi(arrData,"kontinu");
	arrOpsi = randomOpsi(10,10,mean,"kontinu");
	soal = "Hasil ujian statistika sepuluh mahasiswa Teknik Informatika didapati seperti berikut ini:\n"+randomData+"\nHitung mean dari data diatas?";
	arrFrekuensi = [];
	html = htmlMean(arrData, arrFrekuensi, "tunggal");
	arrSoalMean[4] = new objSoal(soal,arrOpsi,mean,html);

	//Mean: soal6
	randomData = randomSoalDataKelompokDiskrit(40,5,10);
	frekuensi = randomFrekuensi(5,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	mean = meanKelompok(arrData, arrFrekuensi);
	arrOpsi = randomOpsi(10,10,mean,"kontinu");
	soal = "Tentukan rata-rata dari data berikut ini berat badan: "+randomData+"\nFrekuensi: "+frekuensi;
	html = htmlMean(arrData, arrFrekuensi, "kelompok");
	arrSoalMean[5] = new objSoal(soal,arrOpsi,mean,html);

	//Mean: soal7
	randomData = randomSoalDataTunggalDiskrit(160,10,5);
	arrData = randomData.split(',');
	mean = meanTanpaFrekuensi(arrData, "diskrit");
	arrOpsi = randomOpsi(5,5,mean,"kontinu");
	soal = "Untuk mengetahui rata-rata tinggi badan siswa di suatu kelas, diambil 10 siswa sebagai sampel dan diukur tinggi badannya. Berikut ini adalah tinggi badan 10 siswa tersebut dalam ukuran centimeter (cm):\n"+randomData+"\nHitung mean dari data diatas?";
	arrFrekuensi = []; 
	html = htmlMean(arrData, arrFrekuensi, "tunggal");
	arrSoalMean[6] = new objSoal(soal,arrOpsi,mean,html);

	// for(var i=0; i<arrSoalMean.length; i++){
	// 	alert((i+1)+arrSoalMean[i].soal + ' - '+arrSoalMean[i].arrOpsi+' - '+arrSoalMean[i].jawaban+'\n\n'+arrSoalMean[i].langkahKerja);
	// }

	//Median: soal 1
	randomData = randomSoalDataULTunggalDiskrit(22, 34, 10);
	arrData = randomData.split(',');
	soal = "Hitunglah median dari data sampel 10 ibu rumah tangga di suatu daerah ini:\n"+randomData;
	var hasilMedian = medianTunggal(arrData);
	arrOpsi = randomOpsi(4,4,hasilMedian,"diskrit");
	html = htmlMedianTunggal(arrData, hasilMedian);
	arrSoalMedian[0] = new objSoal(soal,arrOpsi,hasilMedian,html);

	//Median: soal 2
	randomData = randomSoalDataULTunggalDiskrit(100, 300, 8);
	arrData = randomData.split(',');
	soal = "Berikut ini adalah banyaknya pegawai dari delapan perusahaan:\n"+
	"Perusahaan: 1, 2, 3, 4, 5, 6, 7, 8 \n"+
	"Jumlah Pegawai: "+randomData+
	"\nHitunglah median dari banyaknya pegawai dari delapan perusahaan tersebut!";
	hasilMedian = medianTunggal(arrData);
	arrOpsi = randomOpsi(10,10,hasilMedian,"diskrit");
	html = htmlMedianTunggal(arrData, hasilMedian);
	arrSoalMedian[1] = new objSoal(soal,arrOpsi,hasilMedian,html);

	//Median: soal 3
	randomData = randomSoalDataKelompokKontinu(0,5,100,0.1);
	frekuensi = randomFrekuensi(5,1,50);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	var arrFkk = []; //ambil array frekuensi kumulatif
	var kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	hasilMedian = medianKelompok(arrData, arrFrekuensi, arrFkk, 'kontinu');
	arrOpsi = randomOpsi(10,10,parseFloat(hasilMedian),"kontinu");
	soal = "Berikut ini adalah pendapatan (x Rp 1.000,-) pegawai Perusahaan XYZ dalam seminggu:\n"+
	"Pendapatan: "+randomData+
	"\nJumlah Pegawai: "+frekuensi+
	"\nBerapakah median dari data di atas?";
	html = htmlMedianKelompok(arrData, arrFrekuensi, arrFkk, 'kontinu');
	arrSoalMedian[2] = new objSoal(soal,arrOpsi,hasilMedian,html); 

	//Median: soal 4
	randomData = randomSoalDataKelompokDiskrit(100,4,150);
	frekuensi = randomFrekuensi(4,1,100);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	hasilMedian = medianKelompok(arrData, arrFrekuensi, arrFkk, 'diskrit');
	arrOpsi = randomOpsi(10,10,hasilMedian,"kontinu");
	soal = "Diketahui PT. HIJ bergerak dalam produksi detergen. Informasi selengkapnya sebagai berikut:\n"+
	"Rata-rata produksi detergen per bulan: "+randomData+
	"\nJumlah Pegawai: "+frekuensi+
	"\nBerapakah median dari data di atas?";
	html = htmlMedianKelompok(arrData, arrFrekuensi, arrFkk, 'diskrit');
	arrSoalMedian[3] = new objSoal(soal,arrOpsi,hasilMedian,html); 

	//Median: soal 5
	randomData = randomSoalDataTunggalDiskrit(4, 5, 1);
	frekuensi = randomFrekuensi(5,1,10);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	soal = "Berikut ini adalah nilai siswa SMA Maju Mundur:\n"+
	"Nilai: "+randomData+"\n"+
	"Jumlah Pegawai: "+frekuensi+
	"\nHitunglah nilai tengah dari nilai siswa SMA Maju Mundur tersebut!";
	hasilMedian = medianTunggalFrekuensi(arrData,arrFkk);
	arrOpsi = randomOpsi(4,4,hasilMedian,"diskrit");
	html = htmlMedianTunggalFrekuensi(arrFkk, hasilMedian);
	arrSoalMedian[4] = new objSoal(soal,arrOpsi,hasilMedian,html);

	//Median: soal 6
	randomData = randomSoalDataTunggalKontinu(500,14,50,0.1);
	arrData = randomData.split(',');
	soal = "Berikut ini adalah berat badan karyawan pada Konveksi DEF:\n"+
	randomData+
	"\nHitunglah median dari penelitian yang dilakukan!";
	hasilMedian = medianTunggal(arrData);
	arrOpsi = randomOpsi(10,10,hasilMedian,"diskrit");
	html = htmlMedianTunggal(arrData, hasilMedian);
	arrSoalMedian[5] = new objSoal(soal,arrOpsi,hasilMedian,html);

	// for(var i=0; i<arrSoalMedian.length; i++){
	// 	alert((i+1)+'.'+arrSoalMedian[i].soal + ' - '+arrSoalMedian[i].arrOpsi+' - '+arrSoalMedian[i].jawaban+'\n\n'+arrSoalMedian[i].langkahKerja);
	// } 

	//Modus: soal 1
	arrData = randomKualitatif(25, 3);
	// alert(arrData);
	var hasilModus = modusTunggal(arrData);
	while(hasilModus.split('-')[0] == "Tidak ditemukan") //ulang terus sampe ketemu
	{
		arrData = randomKualitatif(25, 3);
		hasilModus = modusTunggal(arrData);
	}
	soal = "Dari sampel yang diambil, warna baju yang disukai wanita adalah sebagai berikut:\n"+
	arrData+
	"\nModus dari sampel yang diambil adalah warna..";
	var arrJawaban = hasilModus.split('-')[0].split(',');
	html = htmlModusTunggal(arrJawaban);
	arrOpsi = randomOpsiModus(arrData,arrJawaban);
	arrSoalModus[0] = new objSoal(soal,arrOpsi,arrJawaban,html);

	// Modus: soal 2
	randomData = randomFrekuensi(15,50,100);
	arrData = randomData.split(',');
	hasilModus = modusTunggal(arrData);
	while(hasilModus.split('-')[0] == "Tidak ditemukan") //ulang terus sampe ketemu
	{
		randomData = randomFrekuensi(15,50,100);
		arrData = randomData.split(',');
		hasilModus = modusTunggal(arrData);
	}
	// console.log(hasilModus);
	arrJawaban = hasilModus.split('-')[0].split(',');
	html = htmlModusTunggal(arrJawaban);
	arrOpsi = randomOpsiModus(arrData,arrJawaban);
	// alert(arrJawaban + "-" + arrOpsi);
	soal = "Hitunglah modus, jika diketahui pendapatan seminggu (dalam ribu rupiah) dari 15 Mahasiswa yang mengajar murid SD adalah sebagai berikut:\n"+randomData;
	// alert(hasilModus);
	arrSoalModus[1] = new objSoal(soal,arrOpsi,arrJawaban,html);

	// //Modus: soal 3
	randomData = randomSoalDataKelompokKontinu(100,5,200,0.1);
	frekuensi = randomSoalDataTunggalDiskrit(5,5,2);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	shuffle(arrFrekuensi);
	hasilModus = modusKelompok(arrData,arrFrekuensi,'kontinu');
	arrOpsi = randomOpsi(10,10,parseFloat(hasilModus),'kontinu');
	html = htmlModusKelompok(arrData, arrFrekuensi,'kontinu');
	// alert(arrOpsi+'-'+hasilModus);
	soal = "Berapakah uang jajan anak SMP yang paling banyak dihabiskan, jika diketahui uang jajan anak SMP (dalam ribu rupiah) kelas X pada SD ABC setiap hari.\n"+
	"Uang Jajan:"+randomData+"\n"+
	"Frekuensi:"+arrFrekuensi;
	arrSoalModus[2] = new objSoal(soal,arrOpsi,parseFloat(hasilModus),html);

	// //Modus: soal 4
	randomData = randomSoalDataKelompokDiskrit(25,6,35);
	frekuensi = randomSoalDataTunggalDiskrit(5,6,3);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	shuffle(arrFrekuensi);
	hasilModus = modusKelompok(arrData, arrFrekuensi,'diskrit');
	arrOpsi = randomOpsi(10,10,parseFloat(hasilModus),"kontinu");
	html = htmlModusKelompok(arrData, arrFrekuensi,'diskrit');
	soal = "Hitunglah modus, jika diketahui umur karyawan pada Konveksi DEF:\n"+
	"Umur Karyawan: "+randomData+
	"\nJumlah Pegawai: "+arrFrekuensi;
	// html = htmlMean(arrData, arrFrekuensi, "kelompok"); 
	arrSoalModus[3] = new objSoal(soal,arrOpsi,parseFloat(hasilModus),html); 

	// //Modus: soal 5
	randomData = randomDataModusKontinu(25,500,1000);
	arrData = randomData.split(',');
	hasilModus = modusTunggal(arrData);
	while(hasilModus.split('-')[0] == "Tidak ditemukan") //ulang terus sampe ketemu
	{
		randomData = randomDataModusKontinu(25,500,1000);
		arrData = randomData.split(',');
		hasilModus = modusTunggal(arrData);
	}
	arrJawaban = hasilModus.split('-')[0].split(',');
	html = htmlModusTunggal(arrJawaban);
	arrOpsi = randomOpsiModus(arrData,arrJawaban);
	soal = "Hitunglah modus, jika diketahui pendapatan seminggu (dalam ribu rupiah) dari 15 Mahasiswa yang mengajar murid SD adalah sebagai berikut:\n"+randomData;
	arrSoalModus[4] = new objSoal(soal,arrOpsi,arrJawaban,html);

	// //Modus: soal 6
	randomData = randomSoalDataTunggalDiskrit(50,10,5);
	frekuensi = randomFrekuensi(10,1,15);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilModus = modusTunggalFrekuensi(arrData, arrFrekuensi);
	while(hasilModus.split('-')[0] == "Tidak ditemukan") //ulang terus sampe ketemu
	{
		randomData = randomSoalDataTunggalDiskrit(50,10,5);
		frekuensi = randomFrekuensi(10,1,15);
		arrData = randomData.split(',');
		arrFrekuensi = frekuensi.split(',');
		hasilModus = modusTunggalFrekuensi(arrData, arrFrekuensi);
	}
	// // console.log(hasilModus);
	arrJawaban = hasilModus.split('-')[0].split(',');
	html = htmlModusTunggal(arrJawaban);
	arrOpsi = randomOpsiModus(arrData,arrJawaban);
	soal = "Berikut data berat badan siswa :\n"+randomData+"\n"+
	"Jumlah penjualan:"+frekuensi+
	"\nManakah nilai yang sering muncul dari data berat badan di atas?";
	arrSoalModus[5] = new objSoal(soal,arrOpsi,arrJawaban,html);

	// for(var i=0; i<arrSoalModus.length; i++){
	// 	alert((i+1)+'.'+arrSoalModus[i].soal + ' - '+arrSoalModus[i].arrOpsi+' - '+arrSoalModus[i].jawaban+'\n\n'+arrSoalModus[i].langkahKerja);
	// }
}
// buatSoalUKP();
function buatSoalUL() {
	//Kuartil: Soal 1
	randomData = randomSoalDataKelompokDiskrit(100,4,150);
	frekuensi = randomFrekuensi(4,1,50);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	var arrFkk = []; //ambil array frekuensi kumulatif
	var kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	var persen = ulPersen(randomNomorUL, "kuartil");
	var hasilKuartil = kuartilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	arrOpsi = randomOpsi(10,10,hasilKuartil,"kontinu");
	html = htmlKuartilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	soal = "Ada beberapa pedagang pecel lele di Daerah Kendangsari, Surabaya. Pada suatu hari selesai berjualan dihitung jumlah keuntungannya. Hasilnya sebagai berikut:\n"+
		"Keuntungan perhari (x Rp 1.000,-):"+randomData+
		"\nBanyak Pedagang: "+arrFrekuensi+
		"\nHitung keuntungan tertinggi dari "+persen+"% pedagang pecel lele di jalan Kedangsari yang mendapat keuntungan terendah!";
	arrSoalKuartil[0] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);

	//Kuartil: Soal 2
	randomData = randomSoalDataKelompokDiskrit(50,6,150);
	frekuensi = randomFrekuensi(4,1,30);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	var arrFkk = []; //ambil array frekuensi kumulatif
	var kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	persen = ulPersen(randomNomorUL, "kuartil");
	hasilKuartil = kuartilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	arrOpsi = randomOpsi(10,10,hasilKuartil,"kontinu");
	html = htmlKuartilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	soal = "Ada beberapa pedagang mie ayam di Daerah Rungkut, Surabaya. Pada suatu hari selesai berjualan dihitung jumlah keuntungannya. Hasilnya sebagai berikut:\n"+
		"Keuntungan perhari (x Rp 1.000,-):"+randomData+
		"\nBanyak Pedagang: "+arrFrekuensi+
		"\nHitung keuntungan terendah dari "+(100-persen)+"% pedagang mie ayam di Daerah Rungkut yang mendapat keuntungan tertinggi!";
	arrSoalKuartil[1] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);

	//Kuartil: Soal 3
	randomData = randomSoalDataKelompokKontinu(500,7,1000,0.1);
	frekuensi = randomFrekuensi(7,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	hasilKuartil = kuartilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	arrOpsi = randomOpsi(10,10,hasilKuartil,"kontinu");
	html = htmlKuartilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	soal = "Berikut ini adalah survey tentang konsumsi cokelat (gr) per bulan di beberapa keluarga di Daerah KLM:\n"+
		"Konsumsi cokelat (gr):"+randomData+
		"\nBanyak Keluarga: "+arrFrekuensi+
		"\nBerapakah Q"+randomNomorUL+" dari survey di atas?";
	arrSoalKuartil[2] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);

	//Kuartil: Soal 4
	randomData = randomSoalDataULTunggalDiskrit(25,40,12);
	arrData = randomData.split(',');
	var namaKuartil = "";
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	if(randomNomorUL == 1) {
		namaKuartil = "bawah";
	}
	else if(randomNomorUL == 2) {
		namaKuartil = "tengah";
	}
	else {
		namaKuartil = "atas";
	}
	hasilKuartil = kuartilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilKuartil,"diskrit");
	html = htmlKuartilTunggal(arrData, randomNomorUL);
	soal = "Data berat badan (kg) 11 anak di posyandu adalah sebagai berikut:\n"+
		"Berat badan:"+randomData+
		"\nBerapakah Kuartil "+namaKuartil+" dari data di atas?";
	arrSoalKuartil[3] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);
	
	//Kuartil: Soal 5
	randomData = randomSoalDataULTunggalKontinu(10,40,15,0.1);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	hasilKuartil = kuartilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilKuartil,"kontinu");
	html = htmlKuartilTunggal(arrData, randomNomorUL);
	soal = "Diketahui tinggi batang (cm) pertumbuhan 20 biji kacang hijau adalah sebagai berikut:\n"+
		"Tinggi batang:"+randomData+
		"\nBerapakah Kuartil "+randomNomorUL+" dari data di atas?";
	arrSoalKuartil[4] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);

	//Kuartil: Soal 6
	randomData = randomSoalDataULTunggalKontinu(150,180,11,0.5);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	hasilKuartil = kuartilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilKuartil,"kontinu");
	html = htmlKuartilTunggal(arrData, randomNomorUL);
	soal = "Tinggi badan pemain (cm) suatu tim sepak bola adalah sebagai berikut:\n"+randomData+
		"\nBerapakah Kuartil "+randomNomorUL+" dari data di atas?";
	arrSoalKuartil[5] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);

	//Kuartil: Soal 7
	randomData = randomSoalDataKelompokKontinu(100,7,700,0.1);
	frekuensi = randomFrekuensi(7,1,16);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (4 - 1)) + 1;
	hasilKuartil = kuartilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	arrOpsi = randomOpsi(10,10,hasilKuartil,"kontinu");
	html = htmlKuartilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	soal = "Berikut ini adalah survey tentang konsumsi cokelat (gr) per bulan di beberapa keluarga di daerah KLM:\n"+
		"Konsumsi cokelat (gr):"+randomData+
		"\nBanyak Keluarga: "+arrFrekuensi+
		"\nBerapakah Q"+randomNomorUL+" dari survey di atas?";
	arrSoalKuartil[6] = new objSoal(soal,arrOpsi,parseFloat(hasilKuartil),html);

	// for(var i=0; i<arrSoalKuartil.length; i++){
	// 	alert((i+1)+'.'+arrSoalKuartil[i].soal + ' - '+arrSoalKuartil[i].arrOpsi+' - '+arrSoalKuartil[i].jawaban+'\n\n'+arrSoalKuartil[i].langkahKerja);
	// }

	//Desil: Soal 1
	randomData = randomSoalDataULTunggalDiskrit(104,140,12);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	var hasilDesil = desilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilDesil,"diskrit");
	html = htmlDesilTunggal(arrData, randomNomorUL);
	soal = "Diambil 12 hasil mahasiswa yang melakukan tes IQ dan hasilnya sebagai berikut:\n"+randomData+
		"\nHitunglah IQ terendah dari  "+randomNomorUL+"0% mahasiswa yang mempunyai IQ teritinggi!";
	arrSoalDesil[0] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	//Desil: Soal 2
	randomData = randomSoalDataULTunggalDiskrit(100,950,10);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	hasilDesil = desilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilDesil,"kontinu");
	html = htmlDesilTunggal(arrData, randomNomorUL);
	soal = "Diketahui omzet (x Rp 1.000,-)penjualan seminggu 10 sales perusahaan MLM HDE adalah sebagai berikut:\n"+randomData+
		"\nHitung keuntungan terendah dari "+(10-randomNomorUL)+"0% omzet penjualan sales perusahan MLM HDE yang mendapat keuntungan tertinggi!";
	arrSoalDesil[1] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	//Desil: Soal 3
	randomData = randomSoalDataKelompokDiskrit(100,4,150);
	frekuensi = randomFrekuensi(4,1,50);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	hasilDesil = desilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	arrOpsi = randomOpsi(10,10,hasilDesil,"kontinu");
	html = htmlDesilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	soal = "Ada beberapa pedagang pecel lele di Daerah Kendangsari, Surabaya. Pada suatu hari selesai berjualan dihitung jumlah keuntungannya. Hasilnya sebagai berikut:\n"+
		"Keuntungan perhari (x Rp 1.000,-):"+randomData+
		"\nBanyak Pedagang: "+arrFrekuensi+
		"\nHitung keuntungan tertinggi dari "+randomNomorUL+"0% pedagang pecel lele di jalan Kedangsari yang mendapat keuntungan terendah!";
	arrSoalDesil[2] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	//Desil: Soal 4
	randomData = randomSoalDataKelompokKontinu(100,7,700,0.1);
	frekuensi = randomFrekuensi(7,1,16);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	hasilDesil = desilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	arrOpsi = randomOpsi(10,10,hasilDesil,"kontinu");
	html = htmlDesilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	soal = "Berikut ini adalah survey tentang konsumsi cokelat (gr) per bulan di beberapa keluarga di daerah KLM:\n"+
		"Konsumsi cokelat (gr):"+randomData+
		"\nBanyak Keluarga: "+arrFrekuensi+
		"\nBerapakah D"+randomNomorUL+" dari survey di atas?";
	arrSoalDesil[3] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	//Desil: Soal 5
	randomData = randomSoalDataULTunggalDiskrit(30,100,10);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	hasilDesil = desilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilDesil,"kontinu");
	html = htmlDesilTunggal(arrData, randomNomorUL);
	soal = "Hitung D"+randomNomorUL+" dari data berikut ini:\n"+randomData;
	arrSoalDesil[4] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	//Desil: Soal 6
	randomData = randomSoalDataKelompokKontinu(100,5,500,0.5);
	frekuensi = randomFrekuensi(5,1,10);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	hasilDesil = desilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	console.log(hasilDesil);
	arrOpsi = randomOpsi(10,10,hasilDesil,"kontinu");
	html = htmlDesilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	soal = "Diketahui penghasilan (dalam juta) beberapa kepala keluarga adalah sebagai berikut:\n"+
		"Penghasilan:"+randomData+
		"\nBanyak Keluarga: "+arrFrekuensi+
		"\nBerapakah desil ke-"+randomNomorUL+" dari survey di atas?";
	arrSoalDesil[5] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	//Desil: Soal 7
	randomData = randomSoalDataULTunggalKontinu(200,500,10,0.1);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (10 - 1)) + 1;
	hasilDesil = desilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilDesil,"kontinu");
	html = htmlDesilTunggal(arrData, randomNomorUL);
	soal = "Diketahui tinggi (cm) pertumbuhan 10 tanaman hidroponik adalah sebagai berikut:\n"+randomData+
		"\nBerapakah Desil "+randomNomorUL+" dari data di atas?";
	arrSoalDesil[6] = new objSoal(soal,arrOpsi,parseFloat(hasilDesil),html);

	// for(var i=0; i<arrSoalDesil.length; i++){
	// 	alert((i+1)+'.'+arrSoalDesil[i].soal + ' - '+arrSoalDesil[i].arrOpsi+' - '+arrSoalDesil[i].jawaban+'\n\n'+arrSoalDesil[i].langkahKerja);
	// }

	//Persentil: Soal 1
	randomData = randomSoalDataKelompokDiskrit(100,4,150);
	frekuensi = randomFrekuensi(4,1,50);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (80 - 1)) + 1;
	var hasilPersentil = persentilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	arrOpsi = randomOpsi(10,10,hasilPersentil,"kontinu");
	html = htmlPersentilKelompok(arrData, arrFkk, randomNomorUL, 'diskrit');
	soal = "Ada beberapa pedagang pecel lele di Daerah Kendangsari, Surabaya. Pada suatu hari selesai berjualan dihitung jumlah keuntungannya. Hasilnya sebagai berikut:\n"+
		"Keuntungan perhari (x Rp 1.000,-):"+randomData+
		"\nBanyak Pedagang: "+arrFrekuensi+
		"\nHitung keuntungan tertinggi dari "+randomNomorUL+"% pedagang pecel lele di jalan Kedangsari yang mendapat keuntungan terendah!";
	arrSoalPersentil[0] = new objSoal(soal,arrOpsi,parseFloat(hasilPersentil),html);

	//Persentil: Soal 2
	randomData = randomSoalDataKelompokKontinu(100,5,500,0.5);
	frekuensi = randomFrekuensi(5,1,10);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	arrFkk = []; //ambil array frekuensi kumulatif
	kumulatif = 0;
	for(var i=0; i<arrFrekuensi.length; i++)
	{
		kumulatif += parseInt(arrFrekuensi[i]);
		arrFkk[i] = kumulatif;
	}
	randomNomorUL = Math.floor(Math.random() * (80 - 1)) + 1;
	hasilPersentil = persentilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	console.log(hasilPersentil);
	arrOpsi = randomOpsi(10,10,hasilPersentil,"kontinu");
	html = htmlPersentilKelompok(arrData, arrFkk, randomNomorUL, 'kontinu');
	soal = "Berapakah Persentil ke-"+randomNomorUL+", jika diketahui umur dan banyaknya ibu rumah tangga suatu kota disajikan sebagai berikut:\n"+
		"Umur:"+randomData+
		"\nJumlah: "+arrFrekuensi;
	arrSoalPersentil[1] = new objSoal(soal,arrOpsi,parseFloat(hasilPersentil),html);

	//Persentil: Soal 3
	randomData = randomSoalDataULTunggalDiskrit(10,100,12);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (60 - 1)) + 1;
	hasilPersentil = persentilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilPersentil,"kontinu");
	html = htmlPersentilTunggal(arrData, randomNomorUL);
	soal = "Hitung P "+randomNomorUL+" dari data berikut ini:\n"+randomData;
	arrSoalPersentil[2] = new objSoal(soal,arrOpsi,parseFloat(hasilPersentil),html);

	//Persentil: Soal 4
	randomData = randomSoalDataULTunggalKontinu(1500,1900,11,0.5);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (80 - 1)) + 1;
	hasilPersentil = persentilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilPersentil,"kontinu");
	html = htmlPersentilTunggal(arrData, randomNomorUL);
	soal = "Diketahui tinggi (cm) suatu tim pemain sepak bola adalah sebagai berikut:\n"+randomData+
		"\nBerapakah Persentil ke-"+randomNomorUL+" dari data di atas?";
	arrSoalPersentil[3] = new objSoal(soal,arrOpsi,parseFloat(hasilPersentil),html);

	//Persentil: Soal 5
	randomData = randomSoalDataULTunggalKontinu(200,990,11,0.5);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (80 - 1)) + 1;
	hasilPersentil = persentilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilPersentil,"kontinu");
	html = htmlPersentilTunggal(arrData, randomNomorUL);
	soal = "Berapakah persentil ke-"+randomNomorUL+", jika diketahui sampel hasil ujian matematika di suatu kelas adalah sebagai berikut:\n"+randomData;
	arrSoalPersentil[4] = new objSoal(soal,arrOpsi,parseFloat(hasilPersentil),html);

	//Persentil: Soal 6 (jawaban NaN)
	randomData = randomSoalDataULTunggalDiskrit(104,140,10);
	arrData = randomData.split(',');
	randomNomorUL = Math.floor(Math.random() * (80 - 1)) + 1;
	hasilPersentil = persentilTunggal(arrData, randomNomorUL);
	arrOpsi = randomOpsi(10,10,hasilPersentil,"diskrit");
	html = htmlPersentilTunggal(arrData, randomNomorUL);
	soal = "Diambil 10 hasil mahasiswa yang melakukan tes IQ dan hasilnya sebagai berikut:\n"+randomData+
		"\nHitunglah IQ terendah dari  "+randomNomorUL+"% mahasiswa yang mempunyai IQ teritinggi!";
	arrSoalPersentil[5] = new objSoal(soal,arrOpsi,parseFloat(hasilPersentil),html);

	// for(var i=0; i<arrSoalPersentil.length; i++){
	// 	alert((i+1)+'.'+arrSoalPersentil[i].soal + ' - '+arrSoalPersentil[i].arrOpsi+' - '+arrSoalPersentil[i].jawaban+'\n\n'+arrSoalPersentil[i].langkahKerja);
	// }
}
// buatSoalUL();
function buatSoalUPK() {
	//Varian: Soal 1
	var randomData = randomSoalDataULTunggalDiskrit(1,45,6);
	var arrData = randomData.split(',');
	var hasilVarian = varianTunggal(arrData, "populasi");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	var html = varianFunction(arrData, "populasi");
	soal = "Seorang peneliti mengambil data rata-rata pendapatan (dalam juta) ayah pada daerah ABC selama 6 bulan:\n"+
		"Bulan: 1, 2, 3, 4, 5, 6\n"+
		"Pendapatan: "+randomData+
		"\nHitunglah varian dari data tersebut!";
	arrSoalVarian[0] = new objSoal(soal,arrOpsi,parseFloat(hasilVarian),html);

	//Varian: Soal 2
	randomData = randomSoalDataKelompokDiskrit(50,6,8);
	frekuensi = randomFrekuensi(6,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilVarian = varianKelompok(arrData, arrFrekuensi, "sampel");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	soal = "Berikut ini adalah tabel hasil nilai ujian kalkulus sejumlah mahasiswa yang sudah disusun dalam tabel frekuensi.\nNilai ujian: "+randomData+"\nJumlah siswa: "+frekuensi+"\nHitung Varian dari data diatas?";
	html = htmlVarianKelompok(arrData, arrFrekuensi, "sampel"); 
	arrSoalVarian[1] = new objSoal(soal,arrOpsi, hasilVarian,html);

	//Varian: Soal 3
	randomData = randomSoalDataKelompokKontinu(500,4,100, 0.1);
	frekuensi = randomFrekuensi(4,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilVarian = varianKelompok(arrData, arrFrekuensi, "populasi");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	soal = "Hitunglah varian dari datah di bawah ini, jika diketahui nilai ujian kalkulus mahasiswa Teknik Informatika adalah sebagai berikut.\nNilai ujian: "+randomData+"\nJumlah siswa: "+frekuensi;
	html = htmlVarianKelompok(arrData, arrFrekuensi, "populasi"); 
	arrSoalVarian[2] = new objSoal(soal,arrOpsi, hasilVarian,html); 

	//Varian: Soal 4
	var randomData = randomSoalDataULTunggalKontinu(100, 190, 15, 0.5);
	var arrData = randomData.split(',');
	var hasilVarian = varianTunggal(arrData, "sampel");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	var html = varianFunction(arrData, "sampel");
	soal = "Diketahui sampel berat badan (cm) 15 anak di kelas ABC adalah sebagai berikut :\n"+randomData+
		"\nHitunglah varian dari data tersebut!";
	arrSoalVarian[3] = new objSoal(soal,arrOpsi,parseFloat(hasilVarian),html);

	//Varian: Soal 5
	var randomData = randomSoalDataULTunggalDiskrit(100, 150, 7);
	var arrData = randomData.split(',');
	var hasilVarian = varianTunggal(arrData, "sampel");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	var html = varianFunction(arrData, "sampel");
	soal = "Diketahui 7 rata-rata pendapatan perusahaan (dalam jutaan rupiah) dari 12 perusahaan setiap bulan pada Daerah KLM adalah sebagai berikut:\n"+randomData+
		"\nBerapakah varian dari data tersebut!";
	arrSoalVarian[4] = new objSoal(soal,arrOpsi,parseFloat(hasilVarian),html);

	//Varian: Soal 6
	var randomData = randomSoalDataULTunggalDiskrit(17, 21, 20);
	var arrData = randomData.split(',');
	var hasilVarian = varianTunggal(arrData, "sampel");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	var html = varianFunction(arrData, "sampel");
	soal = "Berapakah varian dari data sampel umur mahasiswa Jurusan ABC, Universitas A, jika diketahui data sampel umur mahasiswa tersebut adalah sebagai berikut:\n"+randomData;
	arrSoalVarian[5] = new objSoal(soal,arrOpsi,parseFloat(hasilVarian),html);

	//Varian: Soal 7
	randomData = randomSoalDataKelompokDiskrit(90,5,10);
	frekuensi = randomFrekuensi(5,1,25);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilVarian = varianKelompok(arrData, arrFrekuensi, "populasi");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	soal = "Diketahui hasil ujian tes IQ seluruh karyawan suatu perusahaan adalah sebagai berikut. \nNilai tes IQ: "+randomData+"\nJumlah karyawan: "+frekuensi+"\nHitung Varian dari data di atas?";
	html = htmlVarianKelompok(arrData, arrFrekuensi, "populasi"); 
	arrSoalVarian[6] = new objSoal(soal,arrOpsi, hasilVarian,html);

	//Varian: Soal 8
	randomData = randomSoalDataULTunggalKontinu(10, 100, 5, 0.5);
	frekuensi = randomFrekuensi(5,1,15);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilVarian = varianFrekuensiFunction(arrData, arrFrekuensi, "sampel");
	arrOpsi = randomOpsi(10,10,hasilVarian,"kontinu");
	soal = "Berikut ini adalah survey tentang konsumsi cokelat (gr) per bulan di beberapa keluarga di Daerah J:\n"+
		"Konsumsi cokelat (gr):"+randomData+
		"\nBanyak Keluarga: "+arrFrekuensi+
		"\nBerapakah varian dari survey di atas?";
	html = hasilVarianFrekuensi(arrData, arrFrekuensi, "sampel"); 
	arrSoalVarian[7] = new objSoal(soal,arrOpsi, hasilVarian,html);

	for(var i=0; i<arrSoalVarian.length; i++){
		alert((i+1)+'.'+arrSoalVarian[i].soal + ' - '+arrSoalVarian[i].arrOpsi+' - '+arrSoalVarian[i].jawaban+'\n\n'+arrSoalVarian[i].langkahKerja);
	}

	//SD: Soal 1
	var randomData = randomSoalDataULTunggalDiskrit(1,45,6);
	var arrData = randomData.split(',');
	var hasilSD = sdTunggal(arrData, "populasi");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	var html = sdFunction(arrData, "populasi");
	soal = "Seorang peneliti mengambil data rata-rata pendapatan (dalam juta) ayah pada daerah ABC selama 6 bulan:\n"+
		"Bulan: 1, 2, 3, 4, 5, 6\n"+
		"Pendapatan: "+randomData+
		"\nHitunglah standar deviasi dari data tersebut!";
	arrSoalSD[0] = new objSoal(soal,arrOpsi,parseFloat(hasilSD),html);

	//SD: Soal 2
	randomData = randomSoalDataKelompokDiskrit(50,6,8);
	frekuensi = randomFrekuensi(6,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilSD = sdKelompok(arrData, arrFrekuensi, "sampel");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	soal = "Berikut ini adalah tabel hasil nilai ujian kalkulus sejumlah mahasiswa yang sudah disusun dalam tabel frekuensi.\nNilai ujian: "+randomData+"\nJumlah siswa: "+frekuensi+"\nHitung standar deviasi dari data diatas?";
	html = sdKelompokFunction(arrData, arrFrekuensi, "sampel"); 
	arrSoalSD[1] = new objSoal(soal,arrOpsi, hasilSD,html);

	//SD: Soal 3
	randomData = randomSoalDataKelompokKontinu(500,4,100, 0.1);
	frekuensi = randomFrekuensi(4,1,20);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilSD = sdKelompok(arrData, arrFrekuensi, "populasi");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	soal = "Hitunglah standar deviasi dari datah di bawah ini, jika diketahui nilai ujian kalkulus mahasiswa Teknik Informatika adalah sebagai berikut.\nNilai ujian: "+randomData+"\nJumlah siswa: "+frekuensi;
	html = sdKelompokFunction(arrData, arrFrekuensi, "populasi"); 
	arrSoalSD[2] = new objSoal(soal,arrOpsi, hasilSD,html); 

	//SD: Soal 4
	var randomData = randomSoalDataULTunggalKontinu(100, 190, 15, 0.5);
	var arrData = randomData.split(',');
	var hasilSD = sdTunggal(arrData, "sampel");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	var html = sdFunction(arrData, "sampel");
	soal = "Diketahui sampel berat badan (cm) 15 anak di kelas ABC adalah sebagai berikut :\n"+randomData+
		"\nHitunglah standar deviasi dari data tersebut!";
	arrSoalSD[3] = new objSoal(soal,arrOpsi,parseFloat(hasilSD),html);

	//SD: Soal 5
	var randomData = randomSoalDataULTunggalDiskrit(100, 150, 7);
	var arrData = randomData.split(',');
	var hasilSD = sdTunggal(arrData, "sampel");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	var html = sdFunction(arrData, "sampel");
	soal = "Diketahui 7 rata-rata pendapatan perusahaan (dalam jutaan rupiah) dari 12 perusahaan setiap bulan pada Daerah KLM adalah sebagai berikut:\n"+randomData+
		"\nBerapakah standar deviasi dari data tersebut!";
	arrSoalSD[4] = new objSoal(soal,arrOpsi,parseFloat(hasilSD),html);

	//SD: Soal 6
	var randomData = randomSoalDataULTunggalDiskrit(17, 21, 20);
	var arrData = randomData.split(',');
	var hasilSD = sdTunggal(arrData, "sampel");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	var html = sdFunction(arrData, "sampel");
	soal = "Berapakah standar deviasi dari data sampel umur mahasiswa Jurusan ABC, Universitas A, jika diketahui data sampel umur mahasiswa tersebut adalah sebagai berikut:\n"+randomData;
	arrSoalSD[5] = new objSoal(soal,arrOpsi,parseFloat(hasilSD),html);

	//SD: Soal 7
	randomData = randomSoalDataKelompokDiskrit(90,5,10);
	frekuensi = randomFrekuensi(5,1,25);
	arrData = randomData.split(',');
	arrFrekuensi = frekuensi.split(',');
	hasilSD = sdKelompok(arrData, arrFrekuensi, "populasi");
	arrOpsi = randomOpsi(10,10,hasilSD,"kontinu");
	soal = "Diketahui hasil ujian tes IQ seluruh karyawan suatu perusahaan adalah sebagai berikut. \nNilai tes IQ: "+randomData+"\nJumlah karyawan: "+frekuensi+"\nHitung standar deviasi dari data di atas?";
	html = sdKelompokFunction(arrData, arrFrekuensi, "populasi"); 
	arrSoalSD[6] = new objSoal(soal,arrOpsi, hasilSD,html);

	// for(var i=0; i<arrSoalSD.length; i++){
	// 	alert((i+1)+'.'+arrSoalSD[i].soal + ' - '+arrSoalSD[i].arrOpsi+' - '+arrSoalSD[i].jawaban+'\n\n'+arrSoalSD[i].langkahKerja);
	// }
}
//buatSoalUPK();

$$(document).on('navbar:init', function (e) {
  var navbar = e.detail.navbar;
  var page = e.detail.page;
  console.log("navbar");
});

$$(document).on('page:init', function (e, page) {
	
	//console.log(arrSoal);
	if (page.name=="pengenalan")
	{
		// Set timer untuk pindah ke halaman materi
		setTimeout(function() { 
			//console.log("test");
			//your_func(); 
			page.router.navigate('/materi/');	
		}, 3000);

	}
	else if(page.name == "materi"){	
		// console.log("materi");
//----- SCROLL -----//
		var scrollMin = 45;
		$$("#back-to-top").on('click', function() {
			$$('#wadahMateri').scrollTop(0, 300);
			// alert("tes");
		});
		$$("#diDistribusiFreq").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmDistribusiFreq").offset().top)-scrollMin, 300);
		});
		$$("#dfPengelompokanDF").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmPengelompokanDF").offset().top)-scrollMin, 300);
		});
		$$("#dfPengerjaanDF").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmPengerjaanDF").offset().top)-scrollMin, 300);
		});
		$$("#diGrafik").on('click', function() { //scroll Grafik
			$$('#wadahMateri').scrollTop(($$("#pmGrafik").offset().top)-scrollMin, 300);
		});
		$$("#grHistogram").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmHistogram").offset().top)-scrollMin, 300);
		});
		$$("#grPoligon").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmPoligon").offset().top)-scrollMin, 300);
		});
		$$("#grScatter").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmScatter").offset().top)-scrollMin, 300);
		});
		$$("#grLingkaran").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmLingkaran").offset().top)-scrollMin, 300);
		});
		$$("#grBatang").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmBatang").offset().top)-scrollMin, 300);
		});
		$$("#grSBS").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmSBS").offset().top)-scrollMin, 300);
		});
		$$("#diUKP").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmUKP").offset().top)-scrollMin, 300);
		});
		$$("#ukpMean").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmMean").offset().top)-scrollMin, 300);
		});
		$$("#ukpMedian").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmMedian").offset().top)-scrollMin, 300);
		});
		$$("#ukpModus").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmModus").offset().top)-scrollMin, 300);
		});
		$$("#diUL").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmUL").offset().top)-scrollMin, 300);
		});
		$$("#ulKuartil").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmKuartil").offset().top)-scrollMin, 300);
		});
		$$("#ulDesil").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmDesil").offset().top)-scrollMin, 300);
		});
		$$("#ulPersentil").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmPersentil").offset().top)-scrollMin, 300);
		});
		$$("#diUPD").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmModus").offset().top)-scrollMin, 300);
		});
		$$("#updVarian").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmVarian").offset().top)-scrollMin, 300);
		});
		$$("#updSD").on('click', function() {
			$$('#wadahMateri').scrollTop(($$("#pmSD").offset().top)-scrollMin, 300);
		});

//----- DISTRIBUSI FREKUENSI -----//
		$$("#mulaiPengerjaanDF").on('click', function() {
			$$("#mulaiPengerjaanDF").hide();
			$$("#df-radio").show();
			$$("#tutupPengerjaanDF").show();
			$$("#dfKontainerTextArea").show();
			$$("#dfKontainerAutoInput").show();
			$$("#dfAutoInput").show();
			$$("#dfKerjakan").show();
			document.getElementById("rdb-qty").checked = true;
			document.getElementById("rdb-tunggal").checked = true;
			document.getElementById("rdb-diskrit").checked = true;
			document.getElementById("rdb-belum").checked = true;

		});
		$$("#tutupPengerjaanDF").on('click', function() {
			$$("#mulaiPengerjaanDF").show();
			$$("#df-radio").hide();
			$$("#tutupPengerjaanDF").hide();
			$$("#dfKontainerTextArea").hide();	
	        $$("#dfMasukanData").hide();
	       	$$("#dfTabelKelompok").hide();
	       	$$("#dfTabelTunggal").hide();
			$$("#dfAutoInput").hide();
			$$("#dfKerjakan").hide();
			$$("#dfKontainerAutoInput").hide();
			$$("#dfLangkahPengerjaan").hide();
			$$("#dfTabelHasil").hide();
			$$("#dfTextArea").val("");

			// Reset Row
  			$$('#dfHapusRowKelompok').prop('disabled',true);
  			$$("#dfTambahRowKelompok").prop('disabled',false);
  			//$$("#dfTabelKelompokIsi").html("");
  			var table = document.getElementById('dfTabelKelompokIsi');
			var row = table.insertRow(countRowKelompok-1);
			for (var i=0;i<=countRowKelompok;i++)
			{
				table.deleteRow(0);
			}
			countRowKelompok=1;

			var table = document.getElementById('dfTabelKelompokIsi');
			var row = table.insertRow(countRowKelompok-1);
			row.id = 'dfRowKelompok'+(countRowKelompok);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" id="dfRowVariabelKelompok'+countRowKelompok+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" step="1" min="0" id="dfRowFrekuensiKelompok'+countRowKelompok+'" name="" value="" placeholder="Isi Frekuensi">';

			$$('#dfHapusRowTunggal').prop('disabled',true);
  			$$("#dfTambahRowTunggal").prop('disabled',false);
  			//$$("#dfTabelTunggalIsi").html("");
  			var table = document.getElementById('dfTabelTunggalIsi');
			var row = table.insertRow(countRow-1);
			for (var i=0;i<=countRow;i++)
			{
				table.deleteRow(0);
			}
			countRow=1;

			var table = document.getElementById('dfTabelTunggalIsi');
			var row = table.insertRow(countRow-1);
			row.id = 'dfRowTunggal'+(countRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" id="dfRowVariabelTunggal'+countRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" step="1" min="0" id="dfRowFrekuensiTunggal'+countRow+'" name="" value="" placeholder="Isi Frekuensi">';

		});

		//----- Pilih Jenis Inputan Distribusi Frekuensi -----//
  		$$('input[type=radio]').change(function()
  		{
  			var valCheck=$$('input[type=radio][name=sifat-data]:checked').val();
            cekSifat=valCheck;

            var valFreq=$$('input[type=radio][name=frekuensi]:checked').val();
	        cekFrekuensi=valFreq;

	        var valJD=$$('input[type=radio][name=jenis-data]:checked').val();
	        cekJenisData=valJD;

	        var valJV=$$('input[type=radio][name=jenis-variabel]:checked').val();
	        cekJenisVariabel=valJV;

	        //----- Tampilkan RadioButton -----//
			if(cekSifat == 'kualitatif')
	        {
	        	$$(".kuanti").hide();
	        }
	        else {
	        	$$(".kuanti").show();
	        }

	        //----- Tampilkan Inputan -----//
	        if((cekSifat == 'kualitatif' && cekFrekuensi == 'belum') || (cekSifat == 'kuantitatif' && cekFrekuensi == 'belum'))
	        {
	        	$$("#dfKontainerTextArea").show();	
	        	$$("#dfTabelTunggal").hide();
	        	$$("#dfTabelKelompok").hide();
	        	// $$("#dfKontainerAutoInput").hide();
	        }
	        else if((cekSifat == 'kualitatif' && cekFrekuensi == 'sudah') || (cekSifat == 'kuantitatif' && cekFrekuensi == 'sudah' && cekJenisData == 'tunggal'))
	        {
	        	$$("#dfKontainerTextArea").hide();	
	        	$$("#dfTabelTunggal").show();
	        	$$("#dfTabelKelompok").hide();
	        	// $$("#dfKontainerAutoInput").show();
	        }
	        else if(cekSifat == 'kuantitatif' && cekFrekuensi == 'sudah' && cekJenisData == 'berkelompok')
	        {
	        	$$("#dfKontainerTextArea").hide();	
	        	$$("#dfTabelTunggal").hide();
	        	$$("#dfTabelKelompok").show();
	        	// $$("#dfKontainerAutoInput").show();
	        }
  		});

  		//----- Tambah Baris Data Tunggal -----//
  		var countRow = 1;
  		$$('#dfTambahRowTunggal').click(function()
  		{
  			countRow++;
  			if(countRow == 5)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRow > 1)
  			{
  				$$('#dfHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('dfTabelTunggalIsi');
			var row = table.insertRow(countRow-1);
			row.id = 'dfRowTunggal'+(countRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" id="dfRowVariabelTunggal'+countRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="text" step="1" min="0" id="dfRowFrekuensiTunggal'+countRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#dfHapusRowTunggal').click(function()
  		{
  			countRow--;
  			if(countRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRow < 5)
  			{
  				$$('#dfTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#dfRowTunggal'+(countRow+1)).remove();
  		});

  		//----- Tambah Baris Data Berkelompok -----//
  		var countRowKelompok = 1;
  		$$('#dfTambahRowKelompok').click(function()
  		{
  			countRowKelompok++;
  			if(countRowKelompok == 5)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRowKelompok > 1)
  			{
  				$$('#dfHapusRowKelompok').prop('disabled',false);
  			}

  			var table = document.getElementById('dfTabelKelompokIsi');
			var row = table.insertRow(countRowKelompok-1);
			row.id = 'dfRowKelompok'+(countRowKelompok);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" id="dfRowVariabelKelompok'+countRowKelompok+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" step="1" min="0" id="dfRowFrekuensiKelompok'+countRowKelompok+'" name="" value="" placeholder="Isi Frekuensi">';
  		});

  		//----- Hapus Baris Data Berkelompok -----//
  		$$('#dfHapusRowKelompok').click(function()
  		{
  			countRowKelompok--;
  			if(countRowKelompok == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRowKelompok < 5)
  			{
  				$$('#dfTambahRowKelompok').prop('disabled',false);
  			}

  			$$('#dfRowKelompok'+(countRowKelompok+1)).remove();
  		});

//----- DF Random Input Data -----//
  		$$('#dfAutoInput').click(function()
  		{
  			if(cekFrekuensi == 'sudah')
  			{
  				if(cekSifat == 'kuantitatif')
	  			{
	  				if(cekJenisData == 'tunggal')
		  			{
		  				if(cekJenisVariabel == 'diskrit')
		  				{
		  					var random = 0;
			  				for(var i=1; i<=countRow; i++)
			  				{
			  					//update nilai variabel
			  					var min=random+1; 
							    var max=(min+10);  
							    random = Math.floor(Math.random() * (+max - +min)) + +min;
							    $$('#dfRowVariabelTunggal'+i).val(random);

							    //update frekuensi
							    var minFreq = 1;
							    var maxFreq = 10;
							    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
							    $$('#dfRowFrekuensiTunggal'+i).val(randomFreq);
			  				}
		  				}
		  				else
		  				{
		  					var random = 0;
			  				for(var i=1; i<=countRow; i++)
			  				{
			  					//update nilai variabel
			  					var min=random+1; 
							    var max=(min+10);  
							    random = Math.random() * (+max - +min) + +min;
							    $$('#dfRowVariabelTunggal'+i).val(random.toFixed(3));

							    //update frekuensi
							    var minFreq = 1;
							    var maxFreq = 10;
							    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
							    $$('#dfRowFrekuensiTunggal'+i).val(randomFreq);
			  				}
		  				}
		  			}
		  			else if(cekJenisData == 'berkelompok')
		  			{
		  				if(cekJenisVariabel == 'diskrit')
		  				{
		  					var min=1;
						    var max=(min+10);  
						    var nilaiBawah = Math.floor(Math.random() * (+max - +min)) + +min;

						    var min2 = nilaiBawah;
						    var max2 = nilaiBawah + 10;
						    var nilaiAtas = Math.floor(Math.random() * (+max2 - +min2)) + +min2;
						    var selisih = nilaiAtas - nilaiBawah;

						    // alert(nilaiBawah+'-'+nilaiAtas+','+selisih);

			  				for(var i=1; i<=countRowKelompok; i++)
			  				{
			  					//update nilai variabel
			  					$$('#dfRowVariabelKelompok'+i).val(nilaiBawah+'-'+nilaiAtas);
			  					nilaiBawah = nilaiAtas+1;
			  					nilaiAtas = nilaiBawah+selisih;

							    //update frekuensi
							    var minFreq = 1;
							    var maxFreq = 10;
							    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
							    $$('#dfRowFrekuensiKelompok'+i).val(randomFreq);
			  				}
		  				}
		  				else
		  				{
		  					var min=1;
						    var max=(min+10);  
						    var nilaiBawah = Math.random() * (+max - +min) + +min;

						    var min2 = nilaiBawah;
						    var max2 = nilaiBawah + 10;
						    var nilaiAtas = Math.random() * (+max2 - +min2) + +min2;
						    var selisih = nilaiAtas.toFixed(3) - nilaiBawah.toFixed(3);


			  				for(var i=1; i<=countRowKelompok; i++)
			  				{
			  					//update nilai variabel
			  					$$('#dfRowVariabelKelompok'+i).val(nilaiBawah.toFixed(3)+'-'+nilaiAtas.toFixed(3));
			  					nilaiBawah = nilaiAtas;
			  					nilaiAtas = nilaiBawah+selisih;

							    //update frekuensi
							    var minFreq = 1;
							    var maxFreq = 10;
							    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
							    $$('#dfRowFrekuensiKelompok'+i).val(randomFreq);
			  				}
		  				}
		  			}
	  			}
	  			else if(cekSifat == 'kualitatif')
	  			{
	  				var acakKata = randomKata(countRow);
	  				
	  				//masukkan buah sebagai variabel kualitatif
	  				for(var i=1; i<=countRow; i++)
	  				{
	  					$$('#dfRowVariabelTunggal'+i).val(acakKata[i-1]);

	  					//update frekuensi
					    var minFreq = 1;
					    var maxFreq = 10;
					    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
					    $$('#dfRowFrekuensiTunggal'+i).val(randomFreq);
	  				}
	  			}
  			}
  			else if(cekFrekuensi == 'belum')
  			{
  				if(cekSifat == 'kuantitatif')
	  			{
	  				if(cekJenisVariabel == 'diskrit')
	  				{
		  				$$('#dfTextArea').val(randomTextAreaDF());
	  				}
	  				else if(cekJenisVariabel == 'kontinu')
	  				{
	  					var strData = "";
	  					var min=1;
	  					var max=15;
	  					
		  				for(var i=1; i<=50; i++)
		  				{
		  					//update nilai variabel
		  					if(cekJenisData == 'tunggal')
		  					{
		  						var random = Math.floor(Math.random() * (+max - +min)) + +min;
		  						random*=0.25;
		  					}
		  					else if(cekJenisData == 'berkelompok')
		  					{
		  						var random = Math.random() * (+max - +min) + +min;
		  					}

		  					if(i < 50)
		  					{
		  						strData += random.toFixed(2)+';';
		  					}
		  					else if(i == 50)
		  					{
		  						strData += random.toFixed(2);
		  					}
		  				}
		  				$$('#dfTextArea').text(strData);
	  				}
	  			}
	  			else if(cekSifat == 'kualitatif')
	  			{
	  				var fruits = ['Apel','Jeruk','Mangga','Semangka','Kiwi','Melon','Anggur','Sirsak','Leci','Durian'];
	  				var strFruits = "";
	  				var max = fruits.length;
	  				var min = 1;
	  				//masukkan buah dalam textarea
	  				for(var i=1; i<=50; i++)
	  				{
	  					var random = Math.floor(Math.random() * (+max - +min)) + +min;
	  					if(i < 50)
	  					{
	  						strFruits += fruits[random]+';';
	  					}
	  					else if(i == 50)
	  					{
	  						strFruits += fruits[random];
	  					}
	  				}
	  				$$('#dfTextArea').text(strFruits);
	  			}
  			}
  		});

		//----- KERJAKAN DISTRIBUSI FREKUENSI -----//
		$$('#dfKerjakan').click(function()
  		{
  			$$('#dfTabelHasil').show();
  			var cekKosong = 0;
  			var html = "";
  			var strData = $$('#dfTextArea').val();
			var nilaiData = strData.split(';');

			if(cekFrekuensi == "belum") {
				if(nilaiData.length == 0) {
  					alert("Text area tidak boleh kosong");
	  			}

				for(i = 0; i < nilaiData.length; i++) {
					if(nilaiData[i] == " " || nilaiData[i] == "") {
						alert("Text area tidak boleh kosong");
						cekKosong = 1;
						break;
					}
					else if(nilaiData[i] < 0 && cekSifat == "kuantitatif") {
						alert("Angka tidak boleh bernilai negatif");
						cekKosong = 1;
						break;
					}
				}

	  			if(nilaiData.some(isNaN) && cekKosong == 0 && cekSifat == "kuantitatif"){
	  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
	  				cekKosong = 1;
	  			}
			}
  			if(cekKosong == 0) {
  				var nilaiMax = Math.max.apply(null, nilaiData);
				var nilaiMin = Math.min.apply(null, nilaiData);
				var range = 0;
				var kelasInterval = 0;
				var lebarKelompok = 0;
				var hitung = 0;
				var sisa = 0;
				var batasBawah = 0;
				var batasAtas = 0;
				var frekKumulatif = 0;
	  			var htmlTable = '';
	  			var htmlHeader = '';
	  			var frekuensi = 0;
	  			var titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;
				var frekRelatif = frekuensi/nilaiData.length;
				// meanKFPembilang = 0;
				// meanKFPenyebut = 0;
				// varianKFPembilang = 0;

	  			if(cekFrekuensi == 'belum' && cekJenisVariabel == 'kontinu' && cekJenisData == 'berkelompok' && cekSifat == 'kuantitatif')
	  			{
	  				html = '<li><b>Langkah 1:</b><br> Nilai tertinggi dan nilai terendah data tersebut dicari. Nilai tertinggi data tersebut adalah <b>'+nilaiMax+'</b>, sedangkan nilai terendah data tersebut <b>'+nilaiMin+'</b></li>';

	  				range = nilaiMax-nilaiMin;
	  				html += '<li><b>Langkah 2:</b><br> Nilai range nilai dari data yang ada dihitung dengan cara nilai tertinggi dikurangi nilai terendah. Range data tersebut adalah <b>'+nilaiMax+' – '+nilaiMin+' = '+getKoma(range, dc)+'</b></li>';

	  				kelasInterval = 1+(3.3*Math.log10(nilaiData.length));
	  				html += '<li><b>Langkah 3:</b><br> Jumlah kelompok atau kelas interval data ditentukan dengan rumus 1 + (3.3 log n), di mana n adalah jumlah data. Jika hasil desimal, maka jumlah kelompok dibulatkan ke atas menjadi bilangan bulat. Jumlah kelompok data tersebut adalah <b>1 + (3.3 log '+nilaiData.length+') = '+getKoma(kelasInterval, dc)+' ≈ '+Math.ceil(kelasInterval)+'</b></li>';

	  				lebarKelompok = getKoma(range, dc)/Math.ceil(kelasInterval);
	  				html += '<li><b>Langkah 4:</b><br> Lebar tiap kelompok ditentukan dengan cara range dibagi jumlah kelompok. Jika hasil berupa desimal dengan digit lebih dari 2, maka desimal tersebut diambil 2 digit dengan cara dibulatkan ke atas. Berdasarkan perhitungan, lebar kelompok data tersebut adalah <b>'+getKoma(range, dc) +' dibagi '+Math.ceil(kelasInterval)+' = '+getKoma(lebarKelompok, dc)+'</b></li>';

	  				hitung = lebarKelompok.toFixed(2)*Math.ceil(kelasInterval);
	  				sisa = (hitung - parseFloat(getKoma(range, dc)))/2;
	  				html += '<li><b>Langkah 5:</b><br> Sisa data tersebut dihitung menggunakan rumus:<br><img src=\"img/persamaan21.png\"><br>Sisa data tersebut adalah <b>'+getKoma(sisa, dc)+'</b>, di mana lebar dikali jumlah kelompok adalah '+hitung+'. Lalu '+hitung+' dikurangi range '+getKoma(range, dc)+', kemudian dibagi 2</li>';

	  				batasBawah = nilaiMin - getKoma(sisa, dc);
	  				batasAtas = batasBawah + Math.ceil(kelasInterval);
	  				html += '<li><b>Langkah 6:</b><br> Kelas dibuat dengan menentukan batas bawah dan batas atas setiap kelompok. Batas bawah kelompok didapatkan dari nilai minimum dikurang sisa, sedangkan batas atas kelompok didapatkan dari batas bawah kelompok ditambah jumlah kelompok. Batas bawah kelompok pertama data tersebut adalah <b>'+nilaiMin+' – '+getKoma(sisa, dc)+' = '+getKoma(batasBawah, dc)+'</b>, sedangkan batas atas pertama kelompok data tersebut adalah <b>'+batasBawah.toFixed(2)+' + '+Math.ceil(kelasInterval)+' = '+getKoma(batasAtas, dc)+'</b></li>';

	  				html += '<li><b>Langkah 7:</b><br> Frekuensi data setiap kelompok dihitung</li>';
	  				html += '<li><b>Langkah 8:</b><br> Titik tengah baris ke-x didapatkan dari batas bawah baris ke-x ditambah batas atas baris ke-x, lalu hasil tambah dibagi 2</li>';

	  				//Masukan Data ke Dalam Tabel Distribusi Frekuensi
					batasBawah = nilaiMin-sisa;
					lebarKelompok = parseFloat(getKoma(lebarKelompok, dc));
					for(var i=1; i<=Math.ceil(kelasInterval); i++)
					{
						frekuensi = 0;
						htmlTable += '<tr>';
						htmlTable += '<td><input type=\"text\" value=\"'+getKoma(batasBawah, dc)+'-'+getKoma((batasBawah+lebarKelompok), dc)+'\"></td>';

						//ambil frekuensi
						for(var a=0; a<nilaiData.length; a++)
						{
							if(nilaiData[a] >= batasBawah && nilaiData[a] <= batasBawah+lebarKelompok)
							{
								frekuensi++;
							}
						}
						htmlTable += '<td><input type=\"number\" value=\"'+frekuensi+'\"></td>';

						titikTengah = (getKoma(batasBawah+batasBawah+lebarKelompok), dc)/2;
						htmlTable += '<td><input type=\"number\" value=\"'+titikTengah+'\"></td>';

						frekRelatif = getKoma((frekuensi/nilaiData.length), dc);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=frekuensi;
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+(frekRelatif*100).toFixed(2)+'\"></td>';
						htmlTable += '</tr>';

						batasBawah = batasBawah+lebarKelompok;
					}

					//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Titik Tengah</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';
	  			}
	  			else if(cekFrekuensi == 'belum' && cekJenisVariabel == 'diskrit' && cekJenisData == 'berkelompok' && cekSifat == 'kuantitatif')
	  			{
	  				html = '<li><b>Langkah 1:</b><br> Nilai tertinggi dan nilai terendah data tersebut dicari. Nilai tertinggi data tersebut adalah <b>'+nilaiMax+'</b>, sedangkan nilai terendah data tersebut <b>'+nilaiMin+'</b></li>';

	  				range = nilaiMax-nilaiMin+1;
	  				html += '<li><b>Langkah 2:</b><br> Nilai range nilai dari data yang ada dihitung dengan cara nilai tertinggi dikurangi nilai terendah ditambah satu. Range data tersebut adalah <b>'+nilaiMax+' – '+nilaiMin+' + 1 = '+Math.ceil(range)+'</b></li>';

	  				kelasInterval = 1+3.3*Math.log10(nilaiData.length);
	  				html += '<li><b>Langkah 3:</b><br> Jumlah kelompok atau kelas interval data ditentukan dengan rumus 1 + (3.3 log n), di mana n adalah jumlah data. Jumlah kelompok data tersebut adalah <b>1 + 3.3 log '+nilaiData.length+') = '+kelasInterval.toFixed(2)+' ≈ '+Math.ceil(kelasInterval)+'</b></li>';

	  				lebarKelompok = Math.ceil(range)/Math.ceil(kelasInterval);
	  				html += '<li><b>Langkah 4:</b><br> Lebar tiap kelompok ditentukan dengan cara range dibagi jumlah kelompok. Lebar data tersebut adalah <b>'+Math.ceil(range)+' dibagi '+Math.ceil(kelasInterval)+' = '+lebarKelompok+' ≈ '+Math.ceil(lebarKelompok)+'</b></li>';

	  				html += '<li><b>Langkah 5:</b><br> Tabel distribusi frekuensi dibuat sesuai dengan jumlah kelompok yang telah dihitung. Kelompok batas bawah pertama diambil dari nilai terendah, kemudian ditambah lebar kelompok. Pada kelompok selanjutnya. Batas bawah kelompok selanjutnya didapatkan dari batas atas kelompok sebelumnya ditambah 1</li>';

	  				html += '<li><b>Langkah 6:</b><br> Batas bawah nyata dan batas atas nyata kelas dihitung. Batas bawah nyata didapatkan dari (batas bawah kelompok ke-x) – 0,5, sedangkan batas atas nyata didapatkan dari (batas atas kelompok ke-x) + 0,5</li>';

	  				html += '<li><b>Langkah 7:</b><br> Frekuensi data setiap kelompok dihitung</li>';
	  				html += '<li><b>Langkah 8:</b><br> Titik tengah baris ke-x didapatkan dari batas bawah baris ke-x ditambah batas atas baris ke-x, lalu hasil tambah dibagi 2</li>';

	  				//Masukan Data ke Dalam Tabel Distribusi Frekuensi
					batasBawah = nilaiMin;
					lebarKelompok = Math.ceil(lebarKelompok);
					for(var i=1; i<=Math.ceil(kelasInterval); i++)
					{
						if(batasBawah <= nilaiMax)
						{
							frekuensi = 0;
							htmlTable += '<tr>';
							htmlTable += '<td><input type=\"text\" value=\"'+batasBawah+'-'+(batasBawah+lebarKelompok)+'\"></td>';

							//ambil frekuensi
							for(var a=0; a<nilaiData.length; a++)
							{
								if(nilaiData[a] >= batasBawah && nilaiData[a] <= batasBawah+lebarKelompok)
								{
									frekuensi++;
								}
							}
							htmlTable += '<td><input type=\"number\" value=\"'+frekuensi+'\"></td>';

							titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;
							htmlTable += '<td><input type=\"number\" value=\"'+titikTengah+'\"></td>';

							frekRelatif = (frekuensi/nilaiData.length).toFixed(2);
							htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

							frekKumulatif+=frekuensi;
							htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
							htmlTable += '<td><input type=\"number\" value=\"'+(frekRelatif*100).toFixed(2)+'\"></td>';
							htmlTable += '</tr>';

							batasBawah = batasBawah+lebarKelompok+1; //diskrit dikasih gap 1 antar data
						}
					}

					//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Titik Tengah</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';
	  			}
				else if((cekFrekuensi == 'belum' && (cekJenisData == 'tunggal' || cekJenisData == 'berkelompok') && 
					(cekJenisVariabel == 'diskrit' || cekJenisVariabel == 'kontinu') && cekSifat == 'kualitatif') || 
					(cekFrekuensi == 'belum' && cekJenisData == 'tunggal' && 
					(cekJenisVariabel == 'diskrit' || cekJenisVariabel == 'kontinu') && cekSifat == 'kuantitatif'))
	  			{
	  				html = '<li><b>Langkah 1:</b><br> Semua data yang berbeda pada data inputan dimasukan ke dalam kolom variabel tabel distribusi frekuensi</li>';

	  				range = nilaiMax-nilaiMin+1;
	  				html += '<li><b>Langkah 2:</b><br> Hitung jumlah variabel baris ke-x yang muncul pada data inputan, kemudian masukan ke dalam kolom frekuensi baris ke-x</li>';

	  				//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';

					//isi table
					 nilaiData.sort(function(a,b){
					    return a-b;
					   });
					 var arrVariable = [];
					 var arrFrekuensi = [];
					for(var i=0; i<nilaiData.length; i++)
					{
						var same = false;
						for(var a=0; a<=arrVariable.length; a++)
						{
							if(nilaiData[i] == arrVariable[a]) //cek data sudah dituliskan sebagai variabel atau belum
							{
								//jika ada yang sama, frekuensi ditambah
								arrFrekuensi[a]++;
								same = true;
							}
						}

						if(same == false) //data blm jadi variabel
						{
							arrVariable[arrVariable.length] = nilaiData[i];
							arrFrekuensi[arrFrekuensi.length] = 1;
						}
					}

					for(var j=0; j<arrVariable.length; j++)
					{
						// alert(arrVariable[j]+'-'+arrFrekuensi[j]);
						htmlTable += '<tr>';
						htmlTable += '<td><input type=\"text\" value=\"'+arrVariable[j]+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+arrFrekuensi[j]+'\"></td>';

						frekRelatif = (arrFrekuensi[j]/nilaiData.length).toFixed(2);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=arrFrekuensi[j];
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+(frekRelatif*100).toFixed(2)+'\"></td>';
						htmlTable += '</tr>';
					}
	  			}
	  			else if(cekFrekuensi == 'sudah' && cekJenisData == 'tunggal')
	  			{
	  				//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';
					//ambil total frekuensi
					var totalFrek = 0;
					var frek = 0;
					//ambil total frekuensi totalFrek = 0;
					for(var i=1; i<=countRow; i++)
					{
						totalFrek += parseInt($$('#dfRowFrekuensiTunggal'+i).val());
					}

					for(var i=1; i<=countRow; i++)
					{
						var variable = $$('#dfRowVariabelTunggal'+i).val();
						var frek = $$('#dfRowFrekuensiTunggal'+i).val();
						htmlTable += '<tr>';
						htmlTable += '<td><input type=\"text\" value=\"'+variable+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+frek+'\"></td>';

						frekRelatif = (frek/totalFrek).toFixed(2);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=parseInt(frek);
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+(frekRelatif*100).toFixed(2)+'\"></td>';
						htmlTable += '</tr>';
					}
	  			}
	  			else if(cekFrekuensi == 'sudah' && cekJenisData == 'berkelompok' && cekSifat == 'kuantitatif')
	  			{
	  				//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Titik Tengah</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';

					//ambil total frekuensi
					var totalFrek = 0;
					var frek = 0;
					for(var i=1; i<=countRowKelompok; i++)
					{
						totalFrek += parseInt($$('#dfRowFrekuensiKelompok'+i).val());
					}

					for(var i=1; i<=countRowKelompok; i++)
					{
						var variable = $$('#dfRowVariabelKelompok'+i).val();
						var batasBawah = parseFloat(variable.split('-')[0]);
						var batasAtas = parseFloat(variable.split('-')[1]);
						frek = $$('#dfRowFrekuensiKelompok'+i).val()*1;
						htmlTable += '<tr>';
						htmlTable += '<td><input type=\"text\" value=\"'+variable+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+frek+'\"></td>';

						titikTengah = (batasBawah+batasAtas)/2;
						htmlTable += '<td><input type=\"number\" value=\"'+titikTengah.toFixed(2)+'\"></td>';

						frekRelatif = (frek/totalFrek).toFixed(2);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=parseInt(frek);
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+(frekRelatif*100).toFixed(2)+'\"></td>';
						htmlTable += '</tr>';
					}
	  			}
	  			$$("#dfLangkahPengerjaan").show();
	  			$$("#dfTabelHasil").show();
	  			$$('#dfLangkahPengerjaan').html(html);
	  			$$('#dfTabelHeader').html(htmlHeader);
	  			$$('#dfTabelHasilDFIsi').html(htmlTable);
	  			
  			}
  		});

//----- GRAFIK HISTOGRAM -----//
		$$("#tutupPengerjaanHistogram").hide();	

		$$("#mulaiPengerjaanHistogram").on('click', function() {
			$$("#tutupPengerjaanHistogram").show();
			$$("#mulaiPengerjaanHistogram").hide();
			$$("#histoKontainerAutoInput").show();
			$$("#histoKerjakan").show();
			$$("#histoTabelTunggal").show();

		});
		$$("#tutupPengerjaanHistogram").on('click', function() {
			$$("#mulaiPengerjaanHistogram").show();
			$$("#tutupPengerjaanHistogram").hide();
			$$("#histo-radio").hide();
			$$("#histoKontainerAutoInput").hide();
			$$("#histoKerjakan").hide();
			$$("#histoTabelTunggal").hide();
			$$("#histoChart").hide();
			$$("#histoLangkahPengerjaan").hide();

			// Reset Row
  			$$('#histoHapusRowTunggal').prop('disabled',true);
  			$$("#histoTambahRowTunggal").prop('disabled',false);
  			//$$("#histoTabelTunggalIsi").html("");
  			var table = document.getElementById('histoTabelTunggalIsi');
			var row = table.insertRow(histoCountRow-1);
			for (var i=0;i<=histoCountRow;i++)
			{
				table.deleteRow(0);
			}
			histoCountRow=1;

			var table = document.getElementById('histoTabelTunggalIsi');
			var row = table.insertRow(histoCountRow-1);
			row.id = 'histoRowTunggal'+(histoCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="number" class="histoRVT" id="histoRowVariabelTunggal'+histoCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="histoRFT" step="1" min="0" id="histoRowFrekuensiTunggal'+histoCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
		});

  		//----- Tambah Baris Data Tunggal -----//
  		var histoCountRow = 1;
  		$$('#histoTambahRowTunggal').click(function()
  		{
  			histoCountRow++;
  			if(histoCountRow == 3)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(histoCountRow > 1)
  			{
  				$$('#histoHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('histoTabelTunggalIsi');
			var row = table.insertRow(histoCountRow-1);
			row.id = 'histoRowTunggal'+(histoCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="number" min="0" class="histoRVT" id="histoRowVariabelTunggal'+histoCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="histoRFT" step="1" min="0" id="histoRowFrekuensiTunggal'+histoCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#histoHapusRowTunggal').click(function()
  		{
  			histoCountRow--;
  			if(histoCountRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(histoCountRow < 3)
  			{
  				$$('#histoTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#histoRowTunggal'+(histoCountRow+1)).remove();
  		});

  		//----- Random Input Data -----//
  		$$('#histoAutoInput').click(function()
  		{
  			// Random Generator
			var genMin=0;
			var genMax=2;  
			var genRandom =Math.ceil(Math.random() * (+genMax - +genMin)) + +genMin;
			if(genRandom == 1) //variabel diskrit
			{
				var random = 1;
  				for(var i=1; i<=histoCountRow; i++)
  				{
  					//update nilai variabel
  					var min=random; 
				    var max=(min+10);  
				    random = Math.floor(Math.random() * (+max - +min)) + +min;
				    $$('#histoRowVariabelTunggal'+i).val(random);

				    //update frekuensi
				    var minFreq = 1;
				    var maxFreq = 10;
				    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
				    $$('#histoRowFrekuensiTunggal'+i).val(randomFreq);
  				}
			}
			else if (genRandom == 2) //variabel kontinu
			{
				var random = 1;
  				for(var i=1; i<=histoCountRow; i++)
  				{
  					//update nilai variabel
  					var min=random; 
				    var max=(min+10);  
				    random = Math.random() * (+max - +min) + +min;
				    $$('#histoRowVariabelTunggal'+i).val(random.toFixed(3));

				    //update frekuensi
				    var minFreq = 1;
				    var maxFreq = 10;
				    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
				    $$('#histoRowFrekuensiTunggal'+i).val(randomFreq);
  				}
			}
  		});
  		//----- Pengerjaan Histogram -----//
  		$$("#histoKerjakan").click(function()
  		{ 
  			$$("#histoLangkahPengerjaan").show();
  			$$("#histoChart").show();
   			//langkah-langkah
  			var html = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah kelas variabel yang diamati</li>';
			html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
			html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';
			console.log(html);

  			//tampilkan grafik
  			var arrObject=new Array(); //warna, nama var, dan nilai
  			var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
  			
  			var msg="";
  			$('.histoRVT').each(function(i, obj) {
				  
				  var obj=new Object();
				  obj.variable=$(this).val();
				  obj.value=0;
				  

				  var ix=0;
				  var found=false;
				  while (ix<arrObject.length && !found) //panjang obj = length
				  {
				  	if (arrObject[ix].variable==obj.variable) //jika ada var yg sama
				  	{
				  		found=true;
				  		msg=msg+"Variable "+obj.variable+" sudah digunakan\n";
				  	}
				  	ix++;
				  }

				  if (!found)
				  {
				  	//arrColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
				  	arrObject.push(obj);
				  	console.log(obj);
				  }
				  
		    });

		    var ctr=0;
		    $('.histoRFT').each(function(i, obj) {
				  if (ctr<arrObject.length)
				  {
				  	arrObject[ctr].value=$(this).val();
				  }
				  ctr++;
		    });

		    // Cek error
		    if (msg=="")
		    {
				$$("#histoLangkahPengerjaan").html(html);

		    	var valX=1;
	  			$$("#histoChart").html("");
	  			new Morris.Bar({
				  element: 'histoChart',
				  data: arrObject,
				  xkey: 'variable',
				  ykeys: ['value'],
				  labels: ['Value'], //label keterangan pas bar di klik
				  barColors: function (row, series, type) {
				        return arrColors[row.x];
				  },
				  parseTime:false,
				  barSizeRatio:valX
				});
		    }
		    else {
		    	alert(msg);
		    }
  		});
//----- GRAFIK Poligon -----//
		$$("#tutupPengerjaanPoligon").hide();	

		$$("#mulaiPengerjaanPoligon").on('click', function() {
			$$("#tutupPengerjaanPoligon").show();
			$$("#mulaiPengerjaanPoligon").hide();
			$$("#poligonKontainerAutoInput").show();
			$$("#poligonKerjakan").show();
			$$("#poligonTabelTunggal").show();

		});
		$$("#tutupPengerjaanPoligon").on('click', function() {
			$$("#mulaiPengerjaanPoligon").show();
			$$("#tutupPengerjaanPoligon").hide();
			$$("#poligonKontainerAutoInput").hide();
			$$("#poligonKerjakan").hide();
			$$("#poligonTabelTunggal").hide();
			$$("#poligonChart").hide();
			$$("#poligonLangkahPengerjaan").hide();

			// Reset Row
  			$$('#poligonHapusRowTunggal').prop('disabled',true);
  			$$("#poligonTambahRowTunggal").prop('disabled',false);
  			//$$("#poligonTabelTunggalIsi").html("");
  			var table = document.getElementById('poligonTabelTunggalIsi');
			var row = table.insertRow(poligonCountRow-1);
			for (var i=0;i<=poligonCountRow;i++)
			{
				table.deleteRow(0);
			}
			poligonCountRow=1;

			var table = document.getElementById('poligonTabelTunggalIsi');
			var row = table.insertRow(poligonCountRow-1);
			row.id = 'poligonRowTunggal'+(poligonCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="number" class="poligonRVT" id="poligonRowVariabelTunggal'+poligonCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="poligonRFT" step="1" min="0" id="poligonRowFrekuensiTunggal'+poligonCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
			
		});

  		//----- Tambah Baris Data Tunggal -----//
  		var poligonCountRow = 1;
  		$$('#poligonTambahRowTunggal').click(function()
  		{
  			poligonCountRow++;
  			if(poligonCountRow == 4)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(poligonCountRow > 1)
  			{
  				$$('#poligonHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('poligonTabelTunggalIsi');
			var row = table.insertRow(poligonCountRow-1);
			row.id = 'poligonRowTunggal'+(poligonCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="number" min="0" class="poligonRVT" id="poligonRowVariabelTunggal'+poligonCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="poligonRFT" step="1" min="0" id="poligonRowFrekuensiTunggal'+poligonCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#poligonHapusRowTunggal').click(function()
  		{
  			poligonCountRow--;
  			if(poligonCountRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(poligonCountRow < 4)
  			{
  				$$('#poligonTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#poligonRowTunggal'+(poligonCountRow+1)).remove();
  		});

  		//----- Random Input Data -----//
  		$$('#poligonAutoInput').click(function()
  		{
  			// Random Generator
			var genMin=0;
			var genMax=2;  
			var genRandom =Math.ceil(Math.random() * (+genMax - +genMin)) + +genMin;
			console.log(genRandom);
			if(genRandom == 1) //variabel diskrit
			{
				var random = 1;
  				for(var i=1; i<=poligonCountRow; i++)
  				{
  					//update nilai variabel
  					var min=random; 
				    var max=(min+10);  
				    random = Math.floor(Math.random() * (+max - +min)) + +min;
				    $$('#poligonRowVariabelTunggal'+i).val(random);

				    //update frekuensi
				    var minFreq = 1;
				    var maxFreq = 10;
				    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
				    $$('#poligonRowFrekuensiTunggal'+i).val(randomFreq);
  				}
			}
			else if (genRandom == 2) //variabel kontinu
			{
				var random = 1;
  				for(var i=1; i<=poligonCountRow; i++)
  				{
  					//update nilai variabel
  					var min=random; 
				    var max=(min+10);  
				    random = Math.random() * (+max - +min) + +min;
				    $$('#poligonRowVariabelTunggal'+i).val(random.toFixed(3));

				    //update frekuensi
				    var minFreq = 1;
				    var maxFreq = 10;
				    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
				    $$('#poligonRowFrekuensiTunggal'+i).val(randomFreq);
  				}
			}
  		});

  		//----- Pengerjaan Poligon -----//
  		$$("#poligonKerjakan").click(function()
  		{ 
  			$$("#poligonLangkahPengerjaan").show();
  			$$("#poligonChart").show();
   			//langkah-langkah
  			var html = "";
  			html = '<li><b>Langkah 1:</b><br> Cari titik tengah tiap kelas.</li>';
			html += '<li><b>Langkah 2:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah tiap kelas</li>';
			html += '<li><b>Langkah 3:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
			html += '<li><b>Langkah 4:</b><br> Titik dibuat setinggi frekuensi tiap kelas, lalu tarik garis antar titik yang dibuat</li>';

  			//tampilkan grafik
  			var arrObject=new Array(); //warna, nama var, dan nilai
  			var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
  			
  			var msg="";
  			$('.poligonRVT').each(function(i, obj) {
				  
				  var obj=new Object();
				  obj.variable=$(this).val();
				  obj.value=0;

				  var ix=0;
				  var found=false;
				  while (ix<arrObject.length && !found) //panjang obj = length
				  {
				  	if (arrObject[ix].variable==obj.variable) //jika ada var yg sama
				  	{
				  		found=true;
				  		msg=msg+"Variable "+obj.variable+" sudah digunakan\n";
				  	}
				  	ix++;
				  }

				  if (!found)
				  {
				  	//arrColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
				  	arrObject.push(obj);
				  	console.log(obj);
				  }
		    });
		    var ctr=0;
		    $('.poligonRFT').each(function(i, obj) {
				  if (ctr<arrObject.length)
				  {
				  	arrObject[ctr].value=$(this).val();
				  }
				  ctr++;
		    });

		    if (msg=="")
		    {
	    		$$("#poligonLangkahPengerjaan").html(html);
	    		$$("#poligonChart").html("");
	  			new Morris.Line({
				  element: 'poligonChart',
				  data: arrObject,
				  xkey: 'variable',
				  ykeys: ['value'],
				  labels: ['Value'], //label keterangan pas bar di klik
				  barColors: function (row, series, type) {
				        return arrColors[row.x];
				  },
				  parseTime:false
				});
		    }
		    else {
		    	alert(msg);
		    }
  		});
//----- GRAFIK SCATTER DIAGRAM -----//
		$$("#tutupPengerjaanScatter").hide();	

		$$("#mulaiPengerjaanScatter").on('click', function() {
			$$("#tutupPengerjaanScatter").show();
			$$("#mulaiPengerjaanScatter").hide();
			$$("#scatterKontainerAutoInput").show();
			$$("#scatterKerjakan").show();
			$$("#scatterTabelTunggal").show();

		});
		$$("#tutupPengerjaanScatter").on('click', function() {
			$$("#mulaiPengerjaanScatter").show();
			$$("#tutupPengerjaanScatter").hide();
			$$("#scatterKontainerAutoInput").hide();
			$$("#scatterKerjakan").hide();
			$$("#scatterTabelTunggal").hide();
			$$("#scatterChart").hide();
			$$("#scatterLangkahPengerjaan").hide();

			// Reset Row
  			$$('#scatterHapusRowTunggal').prop('disabled',true);
  			$$("#scatterTambahRowTunggal").prop('disabled',false);
  			//$$("#scatterTabelTunggalIsi").html("");
  			var table = document.getElementById('scatterTabelTunggalIsi');
			var row = table.insertRow(scatterCountRow-1);
			for (var i=0;i<=scatterCountRow;i++)
			{
				table.deleteRow(0);
			}
			scatterCountRow=1;

			var table = document.getElementById('scatterTabelTunggalIsi');
			var row = table.insertRow(scatterCountRow-1);
			row.id = 'scatterRowTunggal'+(scatterCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class="scatterRVT" id="scatterRowVariabelTunggal'+scatterCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="scatterRFT" step="1" min="0" id="scatterRowFrekuensiTunggal'+scatterCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
			
		});

  		//----- Tambah Baris Data Tunggal -----//
  		var scatterCountRow = 1;
  		$$('#scatterTambahRowTunggal').click(function()
  		{
  			scatterCountRow++;
  			if(scatterCountRow == 30)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(scatterCountRow > 1)
  			{
  				$$('#scatterHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('scatterTabelTunggalIsi');
			var row = table.insertRow(scatterCountRow-1);
			row.id = 'scatterRowTunggal'+(scatterCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="number" min="0" class="scatterRVT" id="scatterRowVariabelTunggal'+scatterCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="scatterRFT" step="1" min="0" id="scatterRowFrekuensiTunggal'+scatterCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#scatterHapusRowTunggal').click(function()
  		{
  			scatterCountRow--;
  			if(scatterCountRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(scatterCountRow < 30)
  			{
  				$$('#scatterTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#scatterRowTunggal'+(scatterCountRow+1)).remove();
  		});

  		//----- Random Input Data -----//
  		$$('#scatterAutoInput').click(function()
  		{
			for(var i=1; i<=scatterCountRow; i++)
			{
				//update nilai variabel 
			    random = Math.floor(Math.random() * (100 - 25) ) + 25;
			    $$('#scatterRowVariabelTunggal'+i).val(random);

			    //update frekuensi
			    var minFreq = 1;
			    var maxFreq = 10;
			    var randomFreq = Math.floor(Math.random() * (5 - 1) ) + 1;
			    $$('#scatterRowFrekuensiTunggal'+i).val(randomFreq);
			}
  		});
		//----- Pengerjaan Scatter -----//
  		$$("#scatterKerjakan").click(function()
  		{ 
  			$$("#scatterLangkahPengerjaan").show();
  			$$("#scatterChart").show();
  			$$("#Chart").html("");

   			//langkah-langkah
  			var html = "";
  			html = '<li><b>Langkah 1:</b><br> Tentukan nilai maksimum dan nilai minimum dari kedua data di atas</li>';
			html += '<li><b>Langkah 2:</b><br> Buat sumbu vertikal dan sumbu horizontal beserta skalanya sesuai dengan nilai maksimum dan nilai minimum yang didapatkan</li>';
			html += '<li><b>Langkah 3:</b><br> Lakukan penebaran data</li>';
			html += '<li><b>Langkah 4:</b><br> Lihat pola data untuk menemukan hubungan kedua data tersebut</li>';
			

			var arrObject=new Array(); //warna, nama var, dan nilai
			var dataSecond=new Array();
			var posisi = 1;
			$('.scatterRVT').each(function() {
				
				var xValue = document.getElementById('scatterRowVariabelTunggal'+posisi).value;
				var yValue = document.getElementById('scatterRowFrekuensiTunggal'+posisi).value;
				var object = {
					x: xValue,
					y: yValue
				};
				arrObject.push(object);
				dataSecond.push(xValue);
				posisi++;
			});
			console.log("test", arrObject);

			var ctx = document.getElementById('scatterChart').getContext('2d');
			var chart = new Chart(ctx, {
				// The type of chart we want to create
				type: 'scatter',
			
				// The data for our dataset
				data: {
					labels: dataSecond,
					datasets: [{
						label: 'My First dataset',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data:arrObject
					}]
				},
			
				// Configuration options go here
				options: {}
			});
			//grafik scatter
  		});
//----- GRAFIK LINGKARAN -----//
		$$("#tutupPengerjaanLingkaran").hide();	

		$$("#mulaiPengerjaanLingkaran").on('click', function() {
			$$("#tutupPengerjaanLingkaran").show();
			$$("#mulaiPengerjaanLingkaran").hide();
			$$("#lingkaranKontainerAutoInput").show();
			$$("#lingkaranKerjakan").show();
			$$("#lingkaranTabelTunggal").show();

		});
		$$("#tutupPengerjaanLingkaran").on('click', function() {
			$$("#mulaiPengerjaanLingkaran").show();
			$$("#tutupPengerjaanLingkaran").hide();
			$$("#lingkaranKontainerAutoInput").hide();
			$$("#lingkaranKerjakan").hide();
			$$("#lingkaranTabelTunggal").hide();
			$$("#lingkaranChart").hide();
			$$("#lingkaranLangkahPengerjaan").hide();

			// Reset Row
  			$$('#lingkaranHapusRowTunggal').prop('disabled',true);
  			$$("#lingkaranTambahRowTunggal").prop('disabled',false);
  			//$$("#lingkaranTabelTunggalIsi").html("");
  			var table = document.getElementById('lingkaranTabelTunggalIsi');
			var row = table.insertRow(lingkaranCountRow-1);
			for (var i=0;i<=lingkaranCountRow;i++)
			{
				table.deleteRow(0);
			}
			lingkaranCountRow=1;

			var table = document.getElementById('lingkaranTabelTunggalIsi');
			var row = table.insertRow(lingkaranCountRow-1);
			row.id = 'lingkaranRowTunggal'+(lingkaranCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class="lingkaranRVT" id="lingkaranRowVariabelTunggal'+lingkaranCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="lingkaranRFT" step="1" min="0" id="lingkaranRowFrekuensiTunggal'+lingkaranCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
		});

  		//----- Tambah Baris Data Tunggal -----//
  		var lingkaranCountRow = 1;
  		$$('#lingkaranTambahRowTunggal').click(function()
  		{
  			lingkaranCountRow++;
  			if(lingkaranCountRow == 4)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(lingkaranCountRow > 1)
  			{
  				$$('#lingkaranHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('lingkaranTabelTunggalIsi');
			var row = table.insertRow(lingkaranCountRow-1);
			row.id = 'lingkaranRowTunggal'+(lingkaranCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class="lingkaranRVT" id="lingkaranRowVariabelTunggal'+lingkaranCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="lingkaranRFT" step="1" min="0" id="lingkaranRowFrekuensiTunggal'+lingkaranCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#lingkaranHapusRowTunggal').click(function()
  		{
  			lingkaranCountRow--;
  			if(lingkaranCountRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(lingkaranCountRow < 4)
  			{
  				$$('#lingkaranTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#lingkaranRowTunggal'+(lingkaranCountRow+1)).remove();
  		});

  		//----- Random Input Data -----//
  		$$('#lingkaranAutoInput').click(function()
  		{
  			var acakKata = randomKata(lingkaranCountRow);
			
			//masukkan buah sebagai variabel kualitatif
			for(var i=1; i<=lingkaranCountRow; i++)
			{
				$$('#lingkaranRowVariabelTunggal'+i).val(acakKata[i-1]);

				//update frekuensi
			    var minFreq = 1;
			    var maxFreq = 10;
			    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
			    $$('#lingkaranRowFrekuensiTunggal'+i).val(randomFreq);
			}
  		});

  		//----- Pengerjaan  -----//
  		$$("#lingkaranKerjakan").click(function()
  		{ 
  			$$("#lingkaranLangkahPengerjaan").show();
  			$$("#lingkaranChart").show();
   			//langkah-langkah
  			var html = "";
  			html = '<li><b>Langkah 1:</b><br> Cek data apakah sudah frekuensi sudah dalam bentuk presentase atau belum, jika belum ubah semua frekuensi data tersebut ke dalam bentuk persentase dengan cara data ke-x dibagi total frekuensi dikali 100%</li>';
			html += '<li><b>Langkah 2:</b><br> Mencari besar sudut yang mewakili nilai masing-masing data dengan cara banyak data ke-x dibagi total frekuensi dikali 360 derajat</li>';
			html += '<li><b>Langkah 3:</b><br> Gambar grafik dengan bantuan sudut penggaris</li>';
			html += '<li><b>Langkah 4:</b><br> Tuliskan keterangan pada daerah dalam diagram berupa nama variabel dan persentasenya</li>';

			$$("#lingkaranLangkahPengerjaan").html(html);
  			//tampilkan grafik
  			var arrObject=new Array(); //warna, nama var, dan nilai
  			var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
  			
  			var msg="";
		    var ctr = 1;
		    $$('.lingkaranRFT').each(function(i, obj) {
		    	var label = document.getElementById("lingkaranRowVariabelTunggal"+ctr).value;
		    	var value = $$(this).val();
		    	var object = {
		    		label: label,
		    		value: value
		    	}
		    	arrObject.push(object);
				  ctr++;
		    });

		    if (msg=="")
		    {
	  			$$("#lingkaranChart").html("");
	  			new Morris.Donut({
				  element: 'lingkaranChart',
				  data: arrObject,
				  xkey: 'variable',
				  ykeys: ['value'],
				  labels: ['Value'], //label keterangan pas bar di klik
				  barColors: function (row, series, type) {
				        return arrColors[row.x];
				  },
				  parseTime:false
				});
		    }
		    else {
		    	alert(msg);
		    }
  		});
//----- GRAFIK Batang -----//
		$$("#tutupPengerjaanBatang").hide();	

		$$("#mulaiPengerjaanBatang").on('click', function() {
			$$("#tutupPengerjaanBatang").show();
			$$("#mulaiPengerjaanBatang").hide();
			$$("#batangKontainerAutoInput").show();
			$$("#batangKerjakan").show();
			$$("#batangTabelTunggal").show();

		});
		$$("#tutupPengerjaanBatang").on('click', function() {
			$$("#mulaiPengerjaanBatang").show();
			$$("#tutupPengerjaanBatang").hide();
			$$("#batangKontainerAutoInput").hide();
			$$("#batangKerjakan").hide();
			$$("#batangTabelTunggal").hide();
			$$("#batangChart").hide();
			$$("#batangLangkahPengerjaan").hide();

			// Reset Row
  			$$('#batangHapusRowTunggal').prop('disabled',true);
  			$$("#batangTambahRowTunggal").prop('disabled',false);
  			//$$("#batangTabelTunggalIsi").html("");
  			var table = document.getElementById('batangTabelTunggalIsi');
			var row = table.insertRow(batangCountRow-1);
			for (var i=0;i<=batangCountRow;i++)
			{
				table.deleteRow(0);
			}
			batangCountRow=1;

			var table = document.getElementById('batangTabelTunggalIsi');
			var row = table.insertRow(batangCountRow-1);
			row.id = 'batangRowTunggal'+(batangCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class="batangRVT" id="batangRowVariabelTunggal'+batangCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="batangRFT" step="1" min="0" id="batangRowFrekuensiTunggal'+batangCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
		});

  		//----- Tambah Baris Data Tunggal -----//
  		var batangCountRow = 1;
  		$$('#batangTambahRowTunggal').click(function()
  		{
  			batangCountRow++;
  			if(batangCountRow == 3)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(batangCountRow > 1)
  			{
  				$$('#batangHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('batangTabelTunggalIsi');
			var row = table.insertRow(batangCountRow-1);
			row.id = 'batangRowTunggal'+(batangCountRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class="batangRVT" id="batangRowVariabelTunggal'+batangCountRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="batangRFT" step="1" min="0" id="batangRowFrekuensiTunggal'+batangCountRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#batangHapusRowTunggal').click(function()
  		{
  			batangCountRow--;
  			if(batangCountRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(batangCountRow < 3)
  			{
  				$$('#batangTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#batangRowTunggal'+(batangCountRow+1)).remove();
  		});

  		//----- Random Input Data -----//
  		$$('#batangAutoInput').click(function()
  		{
  			var acakKata = randomKata(batangCountRow);
			
			//masukkan buah sebagai variabel kualitatif
			for(var i=1; i<=batangCountRow; i++)
			{
				$$('#batangRowVariabelTunggal'+i).val(acakKata[i-1]);

				//update frekuensi
			    var minFreq = 1;
			    var maxFreq = 10;
			    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
			    $$('#batangRowFrekuensiTunggal'+i).val(randomFreq);
			}
  		});

  		//----- Pengerjaan  -----//
  		$$("#batangKerjakan").click(function()
  		{ 
  			$$("#batangLangkahPengerjaan").show();
  			$$("#batangChart").show();
   			//langkah-langkah
  			var html = "";
  			html = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi variabel yang diamati</li>';
			html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
			html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';

  			//tampilkan grafik
  			var arrObject=new Array(); //warna, nama var, dan nilai
  			var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
  			
  			var msg="";
  			$('.batangRVT').each(function(i, obj) {
				  
				  var obj=new Object();
				  obj.variable=$(this).val();
				  obj.value=0;

				  var ix=0;
				  var found=false;
				  while (ix<arrObject.length && !found) //panjang obj = length
				  {
				  	if (arrObject[ix].variable==obj.variable) //jika ada var yg sama
				  	{
				  		found=true;
				  		msg=msg+"Variable "+obj.variable+" sudah digunakan\n";
				  	}
				  	ix++;
				  }

				  if (!found)
				  {
				  	//arrColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
				  	arrObject.push(obj);
				  }
				  
		    });
		    var ctr=0;
		    $('.batangRFT').each(function(i, obj) {
				  if (ctr<arrObject.length)
				  {
				  	arrObject[ctr].value=$(this).val();
				  }
				  ctr++;
		    });

		    if (msg=="")
		    {

				$$("#batangLangkahPengerjaan").html(html);
	  			$$("#batangChart").html("");
	  			new Morris.Bar({
				  element: 'batangChart',
				  data: arrObject,
				  xkey: 'variable',
				  ykeys: ['value'],
				  labels: ['Value'], //label keterangan pas bar di klik
				  barColors: function (row, series, type) {
				        return arrColors[row.x];
				  },
				  parseTime:false
				});
		    }
		    else {
		    	alert(msg);
		    }
  		});
//----- GRAFIK Side By Side -----//
		$$("#tutupPengerjaanSBS").hide();	

		$$("#mulaiPengerjaanSBS").on('click', function() {
			$$("#tutupPengerjaanSBS").show();
			$$("#mulaiPengerjaanSBS").hide();
			$$("#sbsKontainerAutoInput").show();
			$$("#sbsKerjakan").show();
			$$("#sbsTabel").show();

		});
		$$("#tutupPengerjaanSBS").on('click', function() {
			$$("#mulaiPengerjaanSBS").show();
			$$("#tutupPengerjaanSBS").hide();
			$$("#sbsKontainerAutoInput").hide();
			$$("#sbsKerjakan").hide();
			$$("#sbsTabel").hide();
			$$("#sbsChart").hide();
			$$("#sbsLangkahPengerjaan").hide();

			// Reset Row
			$$("#sbsRowKtg1").val("")
			$$("#sbsRowKtg2").val("")
			$$("#sbsRowSubKtg1").val("");
			$$("#sbsRowSubKtg2").val("");

			$$("#sbsRowFrekuensi1").val("");
			$$("#sbsRowFrekuensi2").val("");
			$$("#sbsRowFrekuensi3").val("");
			$$("#sbsRowFrekuensi4").val("");

		});

		var sbsCountRow = 2;
  		//----- Random Input Data -----//
  		$$('#sbsAutoInput').click(function()
  		{
  			var acakKata = randomKata(sbsCountRow);
			
			//masukkan buah sebagai variabel kualitatif
			for(var i=1; i<=sbsCountRow; i++)
			{
				$$('#sbsRowKtg'+i).val(acakKata[i-1]);

				//update frekuensi
			    var minFreq = 1;
			    var maxFreq = 10;
			    var randomFreq = Math.floor(Math.random() * (+maxFreq - +minFreq)) + +minFreq;
			    $$('sbsRowKtg'+i).val(randomFreq);
			}

			$$("#sbsRowSubKtg1").val("2017");
			$$("#sbsRowSubKtg2").val("2018");

			$$("#sbsRowFrekuensi1").val(randomSoalDataULTunggalDiskrit(1,10,1));
			$$("#sbsRowFrekuensi2").val(randomSoalDataULTunggalDiskrit(1,10,1));
			$$("#sbsRowFrekuensi3").val(randomSoalDataULTunggalDiskrit(1,10,1));
			$$("#sbsRowFrekuensi4").val(randomSoalDataULTunggalDiskrit(1,10,1));
  		});

  		//----- Pengerjaan  -----//
  		$$("#sbsKerjakan").click(function()
  		{ 
  			$$("#sbsLangkahPengerjaan").show();
  			$$("#sbsChart").show();
  			$$("#sbsChart").html("");
   			//langkah-langkah
  			var html = "";
  			html = '<li><b>Langkah 1:</b><br> Garis horizontal berisi kategori dan sub kategori, setiap batang diwakili sub kategori</li>';
			html += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
			html += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';

  			//tampilkan grafik
  			var data = new Array();
  			var dtl=new Object();
  			dtl.y=$$("#sbsRowKtg1").val();
  			dtl.a=$$("#sbsRowFrekuensi1").val();
  			dtl.b=$$("#sbsRowFrekuensi2").val();
  			data.push(dtl);


  			dtl=new Object();
  			dtl.y=$$("#sbsRowKtg2").val();
  			dtl.a=$$("#sbsRowFrekuensi3").val();
  			dtl.b=$$("#sbsRowFrekuensi4").val();
  			data.push(dtl);

		    config = {
				data: data,
				xkey: 'y',
				ykeys: ['a', 'b'],
				labels: [$$("#sbsRowSubKtg1").val(), $$("#sbsRowSubKtg2").val()],
				fillOpacity: 0.6,
				hideHover: 'auto',
				behaveLikeLine: true,
		    	resize: true,
		    	pointFillColors:['#ffffff'],
		    	pointStrokeColors: ['black'],
		    	lineColors:['gray','red']
		  	};
			config.element = 'sbsChart';
			Morris.Bar(config);

  			
  		});

// UKURAN PEMUSATAN DATA
//----- PENGERJAAN MEAN -----//
  		$$("#tutupPengerjaanMean").hide();	

		$$("#mulaiPengerjaanMean").on('click', function() {
			$$("#tutupPengerjaanMean").show();
			$$("#mulaiPengerjaanMean").hide();
			$$("#meanKontainerAutoInput").show();
			$$("#meanKontainerTextArea").show();
			$$("#meanKerjakan").show();

		});
		$$("#tutupPengerjaanMean").on('click', function() {
			$$("#mulaiPengerjaanMean").show();
			$$("#tutupPengerjaanMean").hide();
			$$("#meanKontainerAutoInput").hide();
			$$("#meanKerjakan").hide();
			$$("#meanKontainerTextArea").hide();
			$$("#meanLangkahPengerjaan").hide();
			$$("#meanTextArea").val("");
			
		});

		$$('#meanAutoInput').click(function() {
			$$('#meanTextArea').val(randomTextAreaUL());
		})
		
		$$('#meanKerjakan').click(function()
  		{
			$$("#meanLangkahPengerjaan").hide();

  			var strData = $$('#meanTextArea').val();
  			var cekKosong = 0;
			var nilaiData = strData.split(';');
			console.log(nilaiData);

			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#meanLangkahPengerjaan").show();
				
				$$("#meanLangkahPengerjaan").html(meanFunction(nilaiData));
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  			
  		});
//----- PENGERJAAN MEDIAN -----//
  		$$("#tutupPengerjaanMedian").hide();	

		$$("#mulaiPengerjaanMedian").on('click', function() {
			$$("#tutupPengerjaanMedian").show();
			$$("#mulaiPengerjaanMedian").hide();
			$$("#medianKontainerAutoInput").show();
			$$("#medianKontainerTextArea").show();
			$$("#medianKerjakan").show();

		});
		$$("#tutupPengerjaanMedian").on('click', function() {
			$$("#mulaiPengerjaanMedian").show();
			$$("#tutupPengerjaanMedian").hide();
			$$("#medianKontainerAutoInput").hide();
			$$("#medianKerjakan").hide();
			$$("#medianKontainerTextArea").hide();
			$$("#medianLangkahPengerjaan").hide();
			$$("#medianTextArea").val("");
			
		});

		$$('#medianAutoInput').click(function() {
			$$('#medianTextArea').val(randomTextAreaUL());
		})

		$$('#medianKerjakan').click(function()
  		{
  			$$("#medianLangkahPengerjaan").hide();

  			var strData = $$('#medianTextArea').val();
  			var cekKosong = 0;
			var nilaiData = strData.split(';');
			console.log(nilaiData);

			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#medianLangkahPengerjaan").show();
				
				$$("#medianLangkahPengerjaan").html(medianFunction(nilaiData));
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  			
  		});
//----- PENGERJAAN MODUS -----//
  		$$("#tutupPengerjaanModus").hide();	

		$$("#mulaiPengerjaanModus").on('click', function() {
			$$("#tutupPengerjaanModus").show();
			$$("#mulaiPengerjaanModus").hide();
			$$("#modusKontainerAutoInput").show();
			$$("#modusKontainerTextArea").show();
			$$("#modusKerjakan").show();
		});
		$$("#tutupPengerjaanModus").on('click', function() {
			$$("#mulaiPengerjaanModus").show();
			$$("#tutupPengerjaanModus").hide();
			$$("#modusKontainerAutoInput").hide();
			$$("#modusKerjakan").hide();
			$$("#modusKontainerTextArea").hide();
			$$("#modusLangkahPengerjaan").hide();
			$$("#modusTextArea").val("");
			
		});

		$$('#modusAutoInput').click(function() {
			$$('#modusTextArea').val(randomTextAreaUL());
		})

		$$('#modusKerjakan').click(function()
  		{
  			$$("#modusLangkahPengerjaan").hide();

  			var strData = $$('#modusTextArea').val();
  			var cekKosong = 0;
			var nilaiData = strData.split(';');
			console.log(nilaiData);

			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#modusLangkahPengerjaan").show();
				
				$$("#modusLangkahPengerjaan").html(modusFunction(nilaiData));
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  			
  		});

//UKURAN LOKASI
//----- PENGERJAAN KUARTIL -----//
  		$$("#tutupPengerjaanKuartil").hide();	

		$$("#mulaiPengerjaanKuartil").on('click', function() {
			$$("#tutupPengerjaanKuartil").show();
			$$("#mulaiPengerjaanKuartil").hide();
			$$("#kuartilKontainerAutoInput").show();
			$$("#kuartilKontainerTextArea").show();
			$$("#kuartilKerjakan").show();
			$$("#kuartil-radio").show();
			document.getElementById("kuartilQ1").checked = true;

		});
		$$("#tutupPengerjaanKuartil").on('click', function() {
			$$("#mulaiPengerjaanKuartil").show();
			$$("#tutupPengerjaanKuartil").hide();
			$$("#kuartilKontainerAutoInput").hide();
			$$("#kuartilKerjakan").hide();
			$$("#kuartilKontainerTextArea").hide();
			$$("#kuartilLangkahPengerjaan").hide();
			$$("#kuartil-radio").hide();
			$$("#kuartilTextArea").val("");
			
		});

		$$('#kuartilAutoInput').click(function() {
			$$('#kuartilTextArea').val(randomTextAreaUL());
		})
		
		$$('#kuartilKerjakan').click(function()
  		{
  			$$("#kuartilLangkahPengerjaan").hide();

	  		var nomorKuartil = 1;
	  		var cekKosong = 0;

  			$$('input[type=radio]').change(function()
	  		{
	  			var valKuartil=$$('input[type=radio][name=letak-kuartil]:checked').val();
	            cekKuartil=valKuartil;
	            console.log(cekKuartil);

		        //----- Tampilkan RadioButton -----//
				if(cekKuartil == 'Q1')
		        {
		        	nomorKuartil = 1;
		        }
		        else if (cekKuartil =="Q2") {
		        	nomorKuartil = 2;
		        }
		        else {
		        	nomorKuartil = 3;
		        }
	  		});

  			var strData = $$('#kuartilTextArea').val();
			var nilaiData = strData.split(';');

			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#kuartilLangkahPengerjaan").show();
				$$("#kuartilLangkahPengerjaan").html(kuartilFunction(nilaiData, nomorKuartil));
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  		});
//----- PENGERJAAN DESIL -----//
  		$$("#tutupPengerjaanDesil").hide();
  		$$("#desilKontainerInput").hide();	

		$$("#mulaiPengerjaanDesil").on('click', function() {
			$$("#tutupPengerjaanDesil").show();
			$$("#mulaiPengerjaanDesil").hide();
			$$("#desilKontainerAutoInput").show();
			$$("#desilKontainerTextArea").show();
			$$("#desilKerjakan").show();
			$$("#desilKontainerInput").show();

		});
		$$("#tutupPengerjaanDesil").on('click', function() {
			$$("#mulaiPengerjaanDesil").show();
			$$("#tutupPengerjaanDesil").hide();
			$$("#desilKontainerAutoInput").hide();
			$$("#desilKerjakan").hide();
			$$("#desilKontainerTextArea").hide();
			$$("#desilLangkahPengerjaan").hide();
			$$("#desilKontainerInput").hide();
			$$("#letak-desil").val("");
			$$("#desilTextArea").val("");
			
		});

		$$('#desilAutoInput').click(function() {
			$$('#desilTextArea').val(randomTextAreaUL());
		})

		$$('#desilKerjakan').click(function()
  		{
  			$$("#desilLangkahPengerjaan").hide();

	  		var nomorDesil = 1;
	  		var cekKosong = 0;

			var valDesil = $$('#letak-desil').val();
			cekDesil = valDesil;

			if (cekDesil == "") {
				alert("Letak desil belum diisi");
				nomorDesil = 1;
				document.getElementById("letak-desil").value = "1";
			}
			else if(cekDesil > 9 || cekDesil < 0) {
				alert("Letak desil di luar jangkauan");
				nomorDesil = 1;
				document.getElementById("letak-desil").value = "1";
  			}
  			else {
  				nomorDesil = cekDesil;
  			}

  			var strData = $$('#desilTextArea').val();
			var nilaiData = strData.split(';');

			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#desilLangkahPengerjaan").show();
				$$("#desilLangkahPengerjaan").html(desilFunction(nilaiData, nomorDesil));
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  		});
//----- PENGERJAAN PERSENTIL -----//
  		$$("#tutupPengerjaanPersentil").hide();
  		$$("#persentilKontainerInput").hide();	

		$$("#mulaiPengerjaanPersentil").on('click', function() {
			$$("#tutupPengerjaanPersentil").show();
			$$("#mulaiPengerjaanPersentil").hide();
			$$("#persentilKontainerAutoInput").show();
			$$("#persentilKontainerTextArea").show();
			$$("#persentilKerjakan").show();
			$$("#persentilKontainerInput").show();

		});
		$$("#tutupPengerjaanPersentil").on('click', function() {
			$$("#mulaiPengerjaanPersentil").show();
			$$("#tutupPengerjaanPersentil").hide();
			$$("#persentilKontainerAutoInput").hide();
			$$("#persentilKerjakan").hide();
			$$("#persentilKontainerTextArea").hide();
			$$("#persentilLangkahPengerjaan").hide();
			$$("#persentilKontainerInput").hide();
			$$("#letak-desil").val("");
			$$("#desilTextArea").val("");
		});

		$$('#persentilAutoInput').click(function() {
			$$('#persentilTextArea').val(randomTextAreaUL());
		})

		$$('#persentilKerjakan').click(function()
  		{
  			$$("#persentilLangkahPengerjaan").hide();

  			var nomorPersentil = 1;
  			var cekKosong = 0;

			var valPersentil = $$('#letak-persentil').val();
			cekPersentil = valPersentil;

			if (cekPersentil == "") {
				alert("Letak persentil belum diisi");
				nomorPersentil = 1;
				document.getElementById("letak-persentil").value = "1";
			}
			else if(cekPersentil > 99 || cekPersentil < 0) {
				alert("Letak persentil di luar jangkauan");
				document.getElementById("letak-persentil").value = "1";
  			}
  			else {
  				nomorPersentil = cekPersentil;
  			}

  			var strData = $$('#persentilTextArea').val();
			var nilaiData = strData.split(';');

			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#persentilLangkahPengerjaan").show();
				$$("#persentilLangkahPengerjaan").html(persentilFunction(nilaiData, nomorPersentil));		
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}	
  		});

//UKURAN PENYEBARAN DATA
//----- PENGERJAAN VARIAN -----//
  		$$("#tutupPengerjaanVarian").hide();	

		$$("#mulaiPengerjaanVarian").on('click', function() {
			$$("#tutupPengerjaanVarian").show();
			$$("#mulaiPengerjaanVarian").hide();
			$$("#varianKontainerAutoInput").show();
			$$("#varianKontainerTextArea").show();
			$$("#varianKerjakan").show();
			document.getElementById("varianSampel").checked = true;
			$$("#varian-radio").show();
		});
		$$("#tutupPengerjaanVarian").on('click', function() {
			$$("#mulaiPengerjaanVarian").show();
			$$("#tutupPengerjaanVarian").hide();
			$$("#varianKontainerAutoInput").hide();
			$$("#varianKerjakan").hide();
			$$("#varianKontainerTextArea").hide();
			$$("#varianLangkahPengerjaan").hide();
			$$("#varian-radio").hide();
			$$("#varianTextArea").val("");
		});

		$$('#varianAutoInput').click(function() {
			$$('#varianTextArea').val(randomTextAreaUL());
		})

		$$('#varianKerjakan').click(function()
  		{
  			var cekKosong = 0;
	  		var strData = $$('#varianTextArea').val();
			var nilaiData = strData.split(';');

  			$$('input[type=radio]').change(function()
	  		{
	  			valVarian=$$('input[type=radio][name=pengamatan-varian]:checked').val();
	            cekVarian=valVarian;
	  		});
  			
  			if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#varianLangkahPengerjaan").show();
  				$$("#varianLangkahPengerjaan").html(varianFunction(nilaiData, cekVarian));	
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  		});
//----- PENGERJAAN STANDAR DEVIASI -----//
  		$$("#tutupPengerjaanSD").hide();	

		$$("#mulaiPengerjaanSD").on('click', function() {
			$$("#tutupPengerjaanSD").show();
			$$("#mulaiPengerjaanSD").hide();
			$$("#sdKontainerAutoInput").show();
			$$("#sdKontainerTextArea").show();
			$$("#sdKerjakan").show();
			document.getElementById("sdSampel").checked = true;
			$$("#sd-radio").show();

		});
		$$("#tutupPengerjaanSD").on('click', function() {
			$$("#mulaiPengerjaanSD").show();
			$$("#tutupPengerjaanSD").hide();
			$$("#sdKontainerAutoInput").hide();
			$$("#sdKerjakan").hide();
			$$("#sdKontainerTextArea").hide();
			$$("#sdLangkahPengerjaan").hide();
			$$("#sd-radio").hide();
			$$("#sdTextArea").val("");
		});

		$$('#sdAutoInput').click(function() {
			$$('#sdTextArea').val(randomTextAreaUL());
		})

		$$('#sdKerjakan').click(function()
  		{
  			var cekKosong = 0;
	  		var strData = $$('#sdTextArea').val();
			var nilaiData = strData.split(';');

  			$$('input[type=radio]').change(function()
	  		{
	  			valSD=$$('input[type=radio][name=pengamatan-sd]:checked').val();
	            cekSD=valSD;
	  		});

	  		if(nilaiData.length == 0) {
  				alert("Text area tidak boleh kosong");
  			}

			for(i = 0; i < nilaiData.length; i++) {
				if(nilaiData[i] == " " || nilaiData[i] == "") {
					alert("Text area tidak boleh kosong");
					cekKosong = 1;
					break;
				}
				else if(nilaiData[i] < 0) {
					alert("Angka tidak boleh bernilai negatif");
					cekKosong = 1;
					break;
				}
			}
  			if(!nilaiData.some(isNaN) && cekKosong == 0) {
  				$$("#sdLangkahPengerjaan").show();
  				$$("#sdLangkahPengerjaan").html(sdFunction(nilaiData, cekSD));	
  			}
  			else if(nilaiData.some(isNaN) && cekKosong == 0){
  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
  			}
  		});
 	}

//LATIHAN SOAL
  	else if (page.name == "latihan-soal") {
		//console.log("in here");
  		$$('#lsKerjakan').click(function()
  		{
  			var selected = [];
			$('[name="ls-materi"]:checked').each(function(checkbox) {
					selected.push($$(this).val());
			});

			// console.log("before");
			localStorage.setItem("check",JSON.stringify(selected));
			page.router.navigate('/soal/');
			//console.log(selected);
  			//console.log("click");
  		});
	}
	else if (page.name=="soal") {

		var html = "";
		var ctr=1;
		var item=JSON.parse(localStorage.getItem("check"));
		var ctr=item.length*3;

		//tampilkan nomor soal dan jawabannya
		for(i=1; i <= ctr; i++) {
			$$("#ns"+i).show();
		}
		
		var index = 1;
		$$(".ns-class").click(function()
	    {
	    	index = $$(this).attr('index');
	    	nomorSoal(index, ctr);
	    });

		var object = [];
		var items = 0;
		for (var i=0;i<item.length;i++)
		{
			if(item[i] == "lsDF")
			{
				buatSoalDF();
				shuffle(arrSoalDF);

				while(arrSoalDF[0].jawaban == "NaN" || arrSoalDF[1].jawaban == "NaN" || arrSoalDF[2].jawaban == "NaN" ){
					shuffle(arrSoalDF);
				}

				object[items] = arrSoalDF[0];
				items++;

				object[items] = arrSoalDF[1];
				items++;

				object[items] = arrSoalDF[2];
				items++;
			}
			else if(item[i] == "lsGrafik")
			{
				buatSoalGrafik();
				shuffle(arrSoalHisto);
				shuffle(arrSoalPoligon);
				shuffle(arrSoalLingkaran);
				shuffle(arrSoalBatang);

				var arrSoalGrafik = [];
				arrSoalGrafik[0] = arrSoalHisto[0];
				arrSoalGrafik[1] = arrSoalPoligon[0];
				arrSoalGrafik[2] = arrSoalLingkaran[0];
				arrSoalGrafik[3] = arrSoalBatang[0];

				shuffle(arrSoalGrafik);

				object[items] = arrSoalGrafik[0];
				items++;

				object[items] = arrSoalGrafik[1];
				items++;

				object[items] = arrSoalGrafik[2];
				items++;
			}
			else if (item[i]=="lsUKP")
			{
				buatSoalUKP();
				shuffle(arrSoalMean);
				shuffle(arrSoalMedian);
				shuffle(arrSoalModus);

				while(arrSoalMean[0].jawaban == "NaN" || arrSoalMedian[0].jawaban == "NaN" || arrSoalModus[0].jawaban == "NaN" ){
					shuffle(arrSoalMean);
					shuffle(arrSoalMedian);
					shuffle(arrSoalModus);
				}

				object[items] = arrSoalMean[0];
				items++;

				//median
				object[items] = arrSoalMedian[0];
				items++;

				//modus
				object[items] = arrSoalModus[0];
				items++;
			}
			else if(item[i] == "lsUL")
			{
				buatSoalUL();
				shuffle(arrSoalKuartil);
				shuffle(arrSoalDesil);
				shuffle(arrSoalPersentil);

				while(arrSoalKuartil[0].jawaban == "NaN" || arrSoalDesil[0].jawaban == "NaN" || arrSoalPersentil[0].jawaban == "NaN" ){
					shuffle(arrSoalKuartil);
					shuffle(arrSoalDesil);
					shuffle(arrSoalPersentil);
				}

			    object[items] = arrSoalKuartil[0];
				items++;

			    //desil
			    object[items] = arrSoalDesil[0];
				items++;

			    //persentil
			    object[items] = arrSoalPersentil[0];
				items++;
			}
			else if(item[i] == "lsUPD")
			{
				buatSoalUPK();
				shuffle(arrSoalVarian);
				shuffle(arrSoalSD);

				var random = Math.floor(Math.random() * (+2 - +1)) + +1;
				if(random == 1) //varian 2 + SD 1
				{
					while(arrSoalVarian[0].jawaban == "NaN" || arrSoalVarian[1].jawaban == "NaN" || arrSoalSD[0].jawaban == "NaN" ){
						shuffle(arrSoalVarian);
						shuffle(arrSoalSD);
					}
					//varian
					object[items] = arrSoalVarian[0];
					items++;

					object[items] = arrSoalVarian[1];
					items++;

					//standar deviasi
					object[items] = arrSoalSD[0];
					items++;
				}
				if(random == 2) //varian 1 + SD 2
				{
					while(arrSoalVarian[0].jawaban == "NaN" || arrSoalSD[1].jawaban == "NaN" || arrSoalSD[0].jawaban == "NaN" ){
						shuffle(arrSoalVarian);
						shuffle(arrSoalSD);
					}
					//varian
					object[items] = arrSoalVarian[0];
					items++;

					//standar deviasi
					object[items] = arrSoalSD[0];
					items++;

					object[items] = arrSoalSD[1];
					items++;
				}
			}
		}
		// alert(object[2].arrOpsi);
		//masukkan soal
		for(var i=0; i<object.length; i++)
		{
			var html = "";
			var temp = object[i].jawaban.toString().split('-');
			// alert(temp[0]);
			if(temp[0] == "grafik")
			{
				html+="<ul class=\'csoal"+(i+1)+"\' style=\'display:none;padding: 0%; list-style-type: none;\'>";
				html+="<li><h2>Soal "+(i+1)+"</h2></li>"
			    html+="<div id=\'exTab1\' class=\'container\'>";
			    html+="<li>"+object[i].soal+"</li>";
			    html+="</ul>";
			    shuffle(object[i].arrOpsi);
			    html+="<div id=\'opsi-jawaban"+(i+1)+"\' class=\'csoal"+(i+1)+" gambar-grafik\'>";
			    for(var a=0; a<2; a++)
			    {
			     	html+="<input type=\'radio\' name=\'opsi"+(i+1)+"\' value=\'"+object[i].arrOpsi[a][0].jawaban+"\'>";
			     	html+="<div id=\'opsi-grafik"+(i+1)+(a+1)+"\'></div>";
			    }
			    html+="</div>";
			    html+="<ul class=\'csoal"+(i+1)+"\' style=\'display:none;padding: 0%; list-style-type: none;\'>";
			    html+="<div id=\'ls-jawaban"+(i+1)+"\' style=\'display:none;\'>";
			    html+="<li style=\'color: #325d79;\'><b>Jawaban</b></li>";
			    html+="<li id=\'jawaban"+(i+1)+"\' jawaban=\'true\'></li>";
			    html+="</div>";
			    html+="<div id=\'langkah-kerja"+(i+1)+"\' style=\'display:none;\'>";
			    html+=object[i].langkahKerja;
			    html+="</div>";
			    html+="</ul>";
			}
			else
			{
				html+="<ul class=\'csoal"+(i+1)+"\' style=\'display:none;padding: 0%; list-style-type: none;\'>";
				html+="<li><h2>Soal "+(i+1)+"</h2></li>"
			    html+="<div id=\'exTab"+(i+1)+"\' class=\'container\'>";
			    html+="<li>"+object[i].soal+"</li>";
			    object[i].arrOpsi[3] = object[i].jawaban;
			    shuffle(object[i].arrOpsi);
			    html+="<div id=\'opsi-jawaban"+(i+1)+"\'>";
			    for(var a=0; a<4; a++)
			    {
			     html+="<input type=\'radio\' name=\'opsi"+(i+1)+"\' value=\'"+object[i].arrOpsi[a]+"\'> "+object[i].arrOpsi[a]+"<br>";
			    }
			    html+="</div>";
			    html+="<div id=\'ls-jawaban"+(i+1)+"\' style=\'display:none;\'>";
			    html+="<li style=\'color: #325d79;\'><b>Jawaban</b></li>";
			    html+="<li id=\'jawaban"+(i+1)+"\' jawaban=\'"+object[i].jawaban+"\'>"+object[i].jawaban+"</li>";
			    html+="</div>";
			    html+="<div id=\'langkah-kerja"+(i+1)+"\' style=\'display:none;\'>";
			    html+=object[i].langkahKerja;
			    html+="</div>";
			    html+="</ul>";
			}
			$$("#lsDF").append(html); //tidak muncul langsung karena display none

			//gambar grafik
			if(temp[0] == "grafik")
			{
			    var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
			    if(temp[1] == "histogram"){
			    	for(var a=0; a<2; a++)
					{
						new Morris.Bar({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: object[i].arrOpsi[a],
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[a];
						  },
						  parseTime:false,
						  barSizeRatio:1
						});
					}
			    }
				else if(temp[1] == "lingkaran"){
					for(var a=0; a<2; a++)
					{
						var arrLingkaran = new Array();
						for(var x=0; x<object[i].arrOpsi[a].length; x++)
						{
							var obj = new Object();
							obj.label = object[i].arrOpsi[a][x].variable;
							obj.value = object[i].arrOpsi[a][x].value;
							arrLingkaran[x] = obj;
						}

						new Morris.Donut({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: arrLingkaran,
						});
					}
				}	
				else if(temp[1] == "batang"){
			    	for(var a=0; a<2; a++)
					{
						new Morris.Bar({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: object[i].arrOpsi[a],
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[a];
						  },
						  parseTime:false,
						});
					}
			    }
			    else if(temp[1] == "garis"){
			    	for(var a=0; a<2; a++)
					{
						new Morris.Line({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: object[i].arrOpsi[a],
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[a];
						  },
						  parseTime:false,
						});
					}
			    }
			}
		}
		$$('.csoal1').show(); //tampilin soal yang pertama
		$$('.gambar-grafik').hide();
		//console.log(item);

		//check radio button opsi
		var salah = ctr;
		var done = 0;
		$$('input[type=radio]').on('click', function()
		{
			var jawaban = $$(this).val();
			$$('#ls-jawaban'+index).show();
			$$('#langkah-kerja'+index).show();
			$$('#opsi-jawaban'+index).addClass("disabled");
			done++;

			var jawabBenar = $$('#jawaban'+index).attr('jawaban');
			if(jawaban == jawabBenar) //benar
			{
				// alert("benar");
				$$('#td-ns'+index).css('background', '#d8fa98');
				salah--;
			}
			else //salah
			{
				// alert("salah");
				$$('#td-ns'+index).css('background', '#ffad9e');
			}
		});

		$$('#button-akhiri').on('click',function()
		{
			var jumlahSoal = ctr;
			var benar = jumlahSoal-salah;
			var score = benar*100/jumlahSoal;
			if(done == jumlahSoal){
				localStorage.setItem("score",score);
				localStorage.setItem("wrong",salah);
				localStorage.setItem("correct",benar);
				page.router.navigate('/ls-akhiri/');	
			}
			else{
				alert("Tidak bisa mengakhiri sebelum menyelesaikan latihan soal.");
			}
		});
	}
	else if (page.name=="ls-akhiri") {
		var item=JSON.parse(localStorage.getItem("check"));
		var score=localStorage.getItem("score");
		var salah=localStorage.getItem("wrong");
		var benar=localStorage.getItem("correct");

		var soal = ambilTipeSoal(item);

		var html = "<li>Nilai Anda<h2 id=\'ls-akhir-nilai\'>"+score+"</h2></li>";
		html += "<li>"+benar+" soal jawaban benar</li>";
		html += "<li>"+salah+" soal jawaban salah</li>";
		if(score == 100){
			html += "<li><h2>SEMPURNA!<br></h2>Tetap pertahankan penguasaan materi Anda!</li>";
		}
		else if(score >= 80 && score < 100){
			html += "<li><h2>HEBAT!<br></h2>Percobaan yang bagus, Anda hampir menguasai semua materi!</li>";
		}
		else if(score >= 60 && score < 80){
			html += "<li><h2>SEMANGAT!<br></h2>Ayo! Asah pengusaan materi Anda lagi!</li>";
		}
		else{
			html += "<li><h2>AYO BERJUANG!<br></h2>Anda perlu banyak belajar, semua akan mudah jika sering latihan.</li>";
		}
		html += "<li><h3>Topik Latihan Soal:</h3></li>";
		html += "<li>"+soal+"</li>";
		$$('#container-hasilLS').html(html);

		$$('#ls-lihat').on('click',function()
		{
			page.router.back();
		});

		$$('#ls-tidak').on('click',function()
		{
			page.router.navigate('/latihan-soal/');
		});
	}
// OLAH DATA
	else if (page.name == "olah-data") 
	{
		var cekpodDF = "odDF";
		var cekpodGrafik = "odGrafik";
		var cekpodUKP = "odUKP";
		var cekpodUL = "odUL";
		var cekpodUPD = "odUPD";

		$$("#back-to-top-od").on('click', function() {
			$$('#wadahOD').scrollTop(0, 300);
		});

		$$("#odKontainerTextArea").show();
		$$("#mulaiPOD").on('click', function() {
			$$("#tutupPOD").show();
			$$("#mulaiPOD").hide();
			$$("#od-topik-materi").show();
		});
		$$("#tutupPOD").on('click', function() {
			$$("#mulaiPOD").show();
			$$("#tutupPOD").hide();
			$$("#od-topik-materi").hide();
			document.getElementById("odDF").checked = true;
			document.getElementById("odGrafik").checked = true;
			document.getElementById("odUKP").checked = true;
			document.getElementById("odUL").checked = true;
			document.getElementById("odUPD").checked = true;
			cekpodDF = "odDF";
			cekpodGrafik = "odGrafik";
			cekpodUKP = "odUKP";
			cekpodUL = "odUL";
			cekpodUPD = "odUPD";
			$$("#odJudulDF").hide();
  			$$("#odLangkahPengerjaan").hide();
  			$$("#odTabelHasil").hide();

  			$$("#odJudulMean").hide();
  			$$("#odMeanLangkahPengerjaan").hide();
			$$("#odJudulMedian").hide();
			$$("#odMedianLangkahPengerjaan").hide();
			$$("#odJudulModus").hide();
			$$("#odModusLangkahPengerjaan").hide();

  			$$("#odJudulKuartil").hide();
			$$("#odKuartilLangkahPengerjaan").hide();
			$$("#odJudulDesil").hide();
			$$("#odDesilLangkahPengerjaan").hide();
			$$("#odJudulPersentil").hide();
			$$("#odPersentilLangkahPengerjaan").hide();

			$$("#odJudulVarian").hide();
  			$$("#odVarianLangkahPengerjaan").hide();
  			$$("#odJudulSD").hide();
  			$$("#odSDLangkahPengerjaan").hide();

  			document.getElementById("updSampel").checked = true;
		});	

		$$('input[type=checkbox]').change(function()
  		{
  			cekpodDF=$$('input[type=checkbox][name=od-materi][id=odDF]:checked').val();
  			cekpodGrafik=$$('input[type=checkbox][name=od-materi][id=odGrafik]:checked').val();
  			cekpodUKP=$$('input[type=checkbox][name=od-materi][id=odUKP]:checked').val();
  			cekpodUL=$$('input[type=checkbox][name=od-materi][id=odUL]:checked').val();
  			cekpodUPD=$$('input[type=checkbox][name=od-materi][id=odUPD]:checked').val();
  		});

		//----- Pilih Jenis Inputan Distribusi Frekuensi -----//
  		$$('input[type=radio]').change(function()
  		{
  			var valCheck=$$('input[type=radio][name=sifat-data]:checked').val();
            cekSifat=valCheck;
            var valFreq=$$('input[type=radio][name=frekuensi]:checked').val();
	        cekFrekuensi=valFreq;
	        var valJD=$$('input[type=radio][name=jenis-data]:checked').val();
	        cekJenisData=valJD;
	        var valJV=$$('input[type=radio][name=jenis-variabel]:checked').val();
	        cekJenisVariabel=valJV;

	        //----- Tampilkan RadioButton -----//
			if(cekSifat == 'kualitatif')
	        {
	        	$$(".kuanti").hide();
	        	$$("#kuantiChb").hide();
	        	cekpodUL=$$('input[type=checkbox][name=od-materi][id=odUL]').checked = false;
  				cekpodUPD=$$('input[type=checkbox][name=od-materi][id=odUPD]').checked = false;
	        }
	        else {
	        	$$(".kuanti").show();
	        	$$("#kuantiChb").show();
	        }

	        //----- Tampilkan Inputan -----//
	        if((cekSifat == 'kualitatif' && cekFrekuensi == 'belum') || (cekSifat == 'kuantitatif' && cekFrekuensi == 'belum'))
	        {
	        	// console.log('masuk pak eko');
	        	$$("#odKontainerTextArea").show();	
	        	$$("#odTabelTunggal").hide();
	        	$$("#odTabelKelompok").hide();
	        	$$("#odKontainerAutoInput").hide();
	        }
	        else if((cekSifat == 'kualitatif' && cekFrekuensi == 'sudah') || (cekSifat == 'kuantitatif' && cekFrekuensi == 'sudah' && cekJenisData == 'tunggal'))
	        {
	        	$$("#odKontainerTextArea").hide();	
	        	$$("#odTabelTunggal").show();
	        	$$("#odTabelKelompok").hide();
	        	$$("#odKontainerAutoInput").show();
	        }
	        else if(cekSifat == 'kuantitatif' && cekFrekuensi == 'sudah' && cekJenisData == 'berkelompok')
	        {
	        	$$("#odKontainerTextArea").hide();	
	        	$$("#odTabelTunggal").hide();
	        	$$("#odTabelKelompok").show();
	        	$$("#odKontainerAutoInput").show();
	        }
  		});
  		//----- Tambah Baris Data Tunggal -----//
  		var countRow = 1;
  		$$('#odTambahRowTunggal').click(function()
  		{
  			countRow++;
  			if(countRow == 50)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRow > 1)
  			{
  				$$('#odHapusRowTunggal').prop('disabled',false);
  			}

  			var table = document.getElementById('odTabelTunggalIsi');
			var row = table.insertRow(countRow-1);
			row.id = 'odRowTunggal'+(countRow);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class="odGrafikRVT" id="odRowVariabelTunggal'+countRow+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="text" class="odGrafikRFT" step="1" min="0" id="odRowFrekuensiTunggal'+countRow+'" name="" value="" placeholder="Isi Frekuensi">';
  		});
  		//----- Hapus Baris Data Tunggal -----//
  		$$('#odHapusRowTunggal').click(function()
  		{
  			countRow--;
  			if(countRow == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRow < 50)
  			{
  				$$('#odTambahRowTunggal').prop('disabled',false);
  			}

  			$$('#odRowTunggal'+(countRow+1)).remove();
  		});
  		//----- Tambah Baris Data Berkelompok -----//
  		var countRowKelompok = 1;
  		$$('#odTambahRowKelompok').click(function()
  		{
  			countRowKelompok++;
  			if(countRowKelompok == 50)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRowKelompok > 1)
  			{
  				$$('#odHapusRowKelompok').prop('disabled',false);
  			}

  			var table = document.getElementById('odTabelKelompokIsi');
			var row = table.insertRow(countRowKelompok-1);
			row.id = 'odRowKelompok'+(countRowKelompok);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			cell1.innerHTML = '<input type="text" class=odGrafikRVT" id="odRowVariabelKelompok'+countRowKelompok+'" name="" value="" placeholder="Isi Variabel">';
			cell2.innerHTML = '<input type="number" class="odGrafikRFT" step="1" min="0" id="odRowFrekuensiKelompok'+countRowKelompok+'" name="" value="" placeholder="Isi Frekuensi">';
  		});

  		//----- Hapus Baris Data Berkelompok -----//
  		$$('#odHapusRowKelompok').click(function()
  		{
  			countRowKelompok--;
  			if(countRowKelompok == 1)
  			{
  				$$(this).prop('disabled',true);
  			}

  			if(countRowKelompok < 50)
  			{
  				$$('#odTambahRowKelompok').prop('disabled',false);
  			}

  			$$('#odRowKelompok'+(countRowKelompok+1)).remove();
  		});
  		$$('#odKerjakan').click(function()
  		{
  			$$("#odJudulDF").hide();
  			$$("#odLangkahPengerjaan").hide();
  			$$("#odTabelHasil").hide();

  			$$("#odJudulMean").hide();
  			$$("#odMeanLangkahPengerjaan").hide();
  			$$("#odJudulMedian").hide();
  			$$("#odMedianLangkahPengerjaan").hide();
  			$$("#odJudulModus").hide();
  			$$("#odModusLangkahPengerjaan").hide();

  			$$("#odJudulKuartil").hide();
  			$$("#odKuartilLangkahPengerjaan").hide();
  			$$("#odJudulDesil").hide();
  			$$("#odDesilLangkahPengerjaan").hide();
  			$$("#odJudulPersentil").hide();
  			$$("#odPersentilLangkahPengerjaan").hide();

  			$$("#odJudulVarian").hide();
  			$$("#odVarianLangkahPengerjaan").hide();
  			$$("#odJudulSD").hide();
  			$$("#odSDLangkahPengerjaan").hide();

  			var cekKosong = 0;
  			var html = "";
  			var strData = $$('#odTextArea').val();
			var nilaiData = strData.split(';');

			if(cekFrekuensi == "belum") {
				if(nilaiData.length == 0) {
  					alert("Text area tidak boleh kosong");
	  			}

				for(i = 0; i < nilaiData.length; i++) {
					if(nilaiData[i] == " " || nilaiData[i] == "") {
						alert("Text area tidak boleh kosong");
						cekKosong = 1;
						break;
					}
					else if(nilaiData[i] < 0 && cekSifat == "kuantitatif") {
						alert("Angka tidak boleh bernilai negatif");
						cekKosong = 1;
						break;
					}
				}

	  			if(nilaiData.some(isNaN) && cekKosong == 0 && cekSifat == "kuantitatif"){
	  				alert("Input harus berupa angka, dan dipisahkan dengan \";\" dan koma dengan \".\"");
	  				cekKosong = 1;
	  			}
			}
  			if(cekKosong == 0) {
// OD: DF
  				var nilaiMax = Math.max.apply(null, nilaiData);
				var nilaiMin = Math.min.apply(null, nilaiData);
				var range = 0;
				var kelasInterval = 0;
				var lebarKelompok = 0;
				var hitung = 0;
				var sisa = 0;
				var batasBawah = 0;
				var batasAtas = 0;
				var frekKumulatif = 0;
	  			var htmlTable = '';
	  			var htmlHeader = '';
	  			var frekuensi = 0;
	  			var titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;
				var frekRelatif = frekuensi/nilaiData.length;
				meanKFPembilang = 0;
				meanKFPenyebut = 0;

				//array
				var arrVariable = [];
				var arrFkk = [];
  				var arrFrek = [];
  				var arrTB = [];

	  			if(cekFrekuensi == 'belum' && cekJenisVariabel == 'kontinu' && cekJenisData == 'berkelompok' && cekSifat == 'kuantitatif')
	  			{
	  				html = '<li><b>Langkah 1:</b><br> Nilai tertinggi dan nilai terendah data tersebut dicari. Nilai tertinggi data tersebut adalah <b>'+nilaiMax+'</b>, sedangkan nilai terendah data tersebut <b>'+nilaiMin+'</b></li>';

	  				range = nilaiMax-nilaiMin;
	  				html += '<li><b>Langkah 2:</b><br> Nilai range nilai dari data yang ada dihitung dengan cara nilai tertinggi dikurangi nilai terendah. Range data tersebut adalah <b>'+nilaiMax+' – '+nilaiMin+' = '+getKoma(range, dc)+'</b></li>';

	  				kelasInterval = 1+(3.3*Math.log10(nilaiData.length));
	  				html += '<li><b>Langkah 3:</b><br> Jumlah kelompok atau kelas interval data ditentukan dengan rumus 1 + (3.3 log n), di mana n adalah jumlah data. Jika hasil desimal, maka jumlah kelompok dibulatkan ke atas menjadi bilangan bulat.  Jumlah kelompok data tersebut adalah<b> 1 + (3.3 log '+nilaiData.length+') = '+getKoma(kelasInterval, dc)+' ≈ '+Math.ceil(kelasInterval)+'</b></li>';

	  				lebarKelompok = getKoma(range, dc)/Math.ceil(kelasInterval);
	  				html += '<li><b>Langkah 4:</b><br> Lebar tiap kelompok ditentukan dengan cara range dibagi jumlah kelompok. Jika hasil berupa desimal dengan digit lebih dari 2, maka desimal tersebut diambil 2 digit dengan cara dibulatkan ke atas. Berdasarkan perhitungan, lebar kelompok data tersebut adalah <b>'+getKoma(range, dc) +' dibagi '+Math.ceil(kelasInterval)+' = '+getKoma(lebarKelompok, dc)+'</b></li>';

	  				hitung = getKoma(lebarKelompok, dc)*Math.ceil(kelasInterval);
	  				sisa = (hitung - parseFloat(getKoma(range, dc)))/2;
	  				html += '<li><b>Langkah 5:</b><br> Sisa data tersebut dihitung menggunakan rumus:<br><img src=\"img/persamaan21.png\"><br>Sisa data tersebut adalah <b>'+getKoma(sisa, dc)+'</b>, di mana lebar dikali jumlah kelompok adalah '+hitung+'. Lalu '+hitung+' dikurangi range '+getKoma(range, dc)+', kemudian dibagi 2</li>';

	  				batasBawah = nilaiMin - getKoma(sisa, dc);
	  				batasAtas = batasBawah + Math.ceil(kelasInterval);
	  				html += '<li><b>Langkah 6:</b><br> Kelas dibuat dengan menentukan batas bawah dan batas atas setiap kelompok. Batas bawah kelompok didapatkan dari nilai minimum dikurang sisa, sedangkan batas atas kelompok didapatkan dari batas bawah kelompok ditambah jumlah kelompok. Batas bawah kelompok pertama data tersebut adalah <b>'+nilaiMin+' – '+getKoma(sisa, dc)+' = '+getKoma(batasBawah, dc)+'</b>, sedangkan batas atas pertama kelompok data tersebut adalah <b>'+getKoma(batasBawah, dc)+' + '+Math.ceil(kelasInterval)+' = '+getKoma(batasAtas, dc)+'</b></li>';

	  				html += '<li><b>Langkah 7:</b><br> Frekuensi data setiap kelompok dihitung</li>';
	  				html += '<li><b>Langkah 8:</b><br> Titik tengah baris ke-x didapatkan dari batas bawah baris ke-x ditambah batas atas baris ke-x, lalu hasil tambah dibagi 2</li>';

	  				//Masukan Data ke Dalam Tabel Distribusi Frekuensi
					batasBawah = nilaiMin-sisa;
					lebarKelompok = parseFloat(getKoma(lebarKelompok, dc));
					for(var i=1; i<=Math.ceil(kelasInterval); i++)
					{
						frekuensi = 0;
						htmlTable += '<tr>';
						htmlTable += '<td><input type=\"text\" value=\"'+(getKoma(batasBawah, dc))+'-'+getKoma((batasBawah+lebarKelompok), dc)+'\"></td>';
						
						//ambil frekuensi
						for(var a=0; a<nilaiData.length; a++)
						{
							if(nilaiData[a] >= batasBawah && nilaiData[a] <= batasBawah+lebarKelompok)
							{
								frekuensi++;
							}
						}
						htmlTable += '<td><input class="odGrafikRFT" type=\"number\" value=\"'+frekuensi+'\"></td>';

						titikTengah = ((getKoma(batasBawah+batasBawah+lebarKelompok), dc))/2;
						htmlTable += '<td><input class="odGrafikRVT" type=\"number\" value=\"'+titikTengah+'\"></td>';

						frekRelatif = getKoma((frekuensi/nilaiData.length), dc);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=frekuensi;
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+getKoma((frekRelatif*100), dc)+'\"></td>';
						htmlTable += '</tr>';

						//isi array
						arrTB[i-1] = getKoma(batasBawah, dc);
						arrVariable[i-1] = getKoma(batasBawah, dc)+'-'+getKoma((batasBawah+lebarKelompok), dc);
						arrFrek[i-1] = frekuensi;
						arrFkk[i-1] = frekKumulatif;

						batasBawah = batasBawah+lebarKelompok;
						meanKFPenyebut = meanKelompokFunctionPenyebut(frekuensi);
						meanKFPembilang = meanKelompokFunctionPembilang(titikTengah, frekuensi);
						varianKFPembilang = varianKelompokFunctionPembilang(titikTengah, frekuensi);
					}

					//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Titik Tengah</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';
	  			}
	  			else if(cekFrekuensi == 'belum' && cekJenisVariabel == 'diskrit' && cekJenisData == 'berkelompok' && cekSifat == 'kuantitatif')
	  			{
	  				html = '<li><b>Langkah 1:</b><br> Nilai tertinggi dan nilai terendah data tersebut dicari. Nilai tertinggi data tersebut adalah <b>'+nilaiMax+'</b>, sedangkan nilai terendah data tersebut <b>'+nilaiMin+'</b></li>';

	  				range = nilaiMax-nilaiMin+1;
	  				html += '<li><b>Langkah 2:</b><br> Nilai range nilai dari data yang ada dihitung dengan cara nilai tertinggi dikurangi nilai terendah ditambah satu. Range data tersebut adalah <b>'+nilaiMax+' – '+nilaiMin+' + 1 = '+Math.ceil(range)+'</b></li>';

	  				kelasInterval = 1+3.3*Math.log10(nilaiData.length);
	  				html += '<li><b>Langkah 3:</b><br> Jumlah kelompok atau kelas interval data ditentukan dengan rumus 1 + (3.3 log n), di mana n adalah jumlah data. Jumlah kelompok data tersebut adalah <b> 1 + 3.3 log '+nilaiData.length+') = '+getKoma(kelasInterval, dc)+' ≈ '+Math.ceil(kelasInterval)+'</b></li>';

	  				lebarKelompok = Math.ceil(range)/Math.ceil(kelasInterval);
	  				html += '<li><b>Langkah 4:</b><br> Lebar tiap kelompok ditentukan dengan cara range dibagi jumlah kelompok. Lebar data tersebut adalah <b>'+Math.ceil(range)+' dibagi '+Math.ceil(kelasInterval)+' = '+Math.ceil(lebarKelompok)+' ≈ '+Math.ceil(lebarKelompok)+'</b></li>';

	  				html += '<li><b>Langkah 5:</b><br> Tabel distribusi frekuensi dibuat sesuai dengan jumlah kelompok yang telah dihitung. Kelompok batas bawah pertama diambil dari nilai terendah, kemudian ditambah lebar kelompok. Pada kelompok selanjutnya. Batas bawah kelompok selanjutnya didapatkan dari batas atas kelompok sebelumnya ditambah 1</li>';

	  				html += '<li><b>Langkah 6:</b><br> Batas bawah nyata dan batas atas nyata kelas dihitung. Batas bawah nyata didapatkan dari (batas bawah kelompok ke-x) – 0,5, sedangkan batas atas nyata didapatkan dari (batas atas kelompok ke-x) + 0,5</li>';

	  				html += '<li><b>Langkah 7:</b><br> Frekuensi data setiap kelompok dihitung</li>';
	  				html += '<li><b>Langkah 8:</b><br> Titik tengah baris ke-x didapatkan dari batas bawah baris ke-x ditambah batas atas baris ke-x, lalu hasil tambah dibagi 2</li>';

	  				//Masukan Data ke Dalam Tabel Distribusi Frekuensi
					batasBawah = nilaiMin;
					lebarKelompok = Math.ceil(lebarKelompok);
					for(var i=1; i<=Math.ceil(kelasInterval); i++)
					{
						if(batasBawah <= nilaiMax)
						{
							frekuensi = 0;
							htmlTable += '<tr>';
							htmlTable += '<td><input type=\"text\" value=\"'+batasBawah+'-'+(batasBawah+lebarKelompok)+'\"></td>';

							//ambil frekuensi
							for(var a=0; a<nilaiData.length; a++)
							{
								if(nilaiData[a] >= batasBawah && nilaiData[a] <= batasBawah+lebarKelompok)
								{
									frekuensi++;
								}
							}
							htmlTable += '<td><input class="odGrafikRFT" type=\"number\" value=\"'+frekuensi+'\"></td>';

							titikTengah = (batasBawah+batasBawah+lebarKelompok)/2;
							htmlTable += '<td><input class="odGrafikRVT" type=\"number\" value=\"'+titikTengah+'\"></td>';

							frekRelatif = getKoma((frekuensi/nilaiData.length), dc);
							htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

							frekKumulatif+=frekuensi;
							htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
							htmlTable += '<td><input type=\"number\" value=\"'+getKoma((frekRelatif*100), dc)+'\"></td>';
							htmlTable += '</tr>';

							//isi array
							arrTB[i-1] = batasBawah-0.5;
							arrVariable[i-1] = batasBawah+'-'+(batasBawah+lebarKelompok);
							arrFrek[i-1] = frekuensi;
							arrFkk[i-1] = frekKumulatif;

							batasBawah = batasBawah+lebarKelompok+1; //diskrit dikasih gap 1 antar data

							meanKFPembilang = meanKelompokFunctionPembilang(titikTengah, frekuensi);
							varianKFPembilang = varianKelompokFunctionPembilang(titikTengah, frekuensi);
							meanKFPenyebut = meanKelompokFunctionPenyebut(frekuensi);
						}
					}

					//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Titik Tengah</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';
	  			}
				else if((cekFrekuensi == 'belum' && (cekJenisData == 'tunggal' || cekJenisData == 'berkelompok') && 
					(cekJenisVariabel == 'diskrit' || cekJenisVariabel == 'kontinu') && cekSifat == 'kualitatif') || 
					(cekFrekuensi == 'belum' && cekJenisData == 'tunggal' && 
					(cekJenisVariabel == 'diskrit' || cekJenisVariabel == 'kontinu') && cekSifat == 'kuantitatif'))
	  			{
	  				html = '<li><b>Langkah 1:</b><br> Semua data yang berbeda pada data inputan dimasukan ke dalam kolom variabel tabel distribusi frekuensi</li>';

	  				range = nilaiMax-nilaiMin+1;
	  				html += '<li><b>Langkah 2:</b><br> Hitung jumlah variabel baris ke-x yang muncul pada data inputan, kemudian masukan ke dalam kolom frekuensi baris ke-x</li>';

	  				//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';

					//isi table
					 nilaiData.sort(function(a,b){
					    return a-b;
					   });
					 var arrVariable = [];
					 var arrFrekuensi = [];
					for(var i=0; i<nilaiData.length; i++)
					{
						var same = false;
						for(var a=0; a<=arrVariable.length; a++)
						{
							if(nilaiData[i] == arrVariable[a]) //cek data sudah dituliskan sebagai variabel atau belum
							{
								//jika ada yang sama, frekuensi ditambah
								arrFrekuensi[a]++;
								same = true;
							}
						}

						if(same == false) //data blm jadi variabel
						{
							arrVariable[arrVariable.length] = nilaiData[i];
							arrFrekuensi[arrFrekuensi.length] = 1;
						}
					}

					for(var j=0; j<arrVariable.length; j++)
					{
						// alert(arrVariable[j]+'-'+arrFrekuensi[j]);
						htmlTable += '<tr>';
						htmlTable += '<td><input class="odGrafikRVT" type=\"text\" value=\"'+arrVariable[j]+'\"></td>';
						htmlTable += '<td><input class="odGrafikRFT" type=\"number\" value=\"'+arrFrekuensi[j]+'\"></td>';

						frekRelatif = getKoma((arrFrekuensi[j]/nilaiData.length), dc);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=arrFrekuensi[j];
						arrFkk[i] = frekKumulatif;
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+getKoma((frekRelatif*100), dc)+'\"></td>';
						htmlTable += '</tr>';
					}
	  			}
	  			else if(cekFrekuensi == 'sudah' && cekJenisData == 'tunggal')
	  			{
	  				//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';
					//ambil total frekuensi
					var totalFrek = 0;
					var frek = 0;
					//ambil total frekuensi totalFrek = 0;
					for(var i=1; i<=countRow; i++)
					{
						totalFrek += parseInt($$('#odRowFrekuensiTunggal'+i).val());
					}

					for(var i=1; i<=countRow; i++)
					{
						var variable = $$('#odRowVariabelTunggal'+i).val();
						arrVariable[i-1] = variable;
						frek = $$('#odRowFrekuensiTunggal'+i).val();
						arrFrek[i-1] = frek;
						htmlTable += '<tr>';
						htmlTable += '<td><input class="odGrafikRVT" type=\"text\" value=\"'+variable+'\"></td>';
						htmlTable += '<td><input class="odGrafikRFT" type=\"number\" value=\"'+frek+'\"></td>';

						frekRelatif = getKoma((frek/totalFrek), dc);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=parseInt(frek);
						arrFkk[i-1] = frekKumulatif;
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+getKoma((frekRelatif*100), dc)+'\"></td>';
						htmlTable += '</tr>';
					}
	  			}
	  			else if(cekFrekuensi == 'sudah' && cekJenisData == 'berkelompok' && cekSifat == 'kuantitatif')
	  			{
	  				//header
					htmlHeader+='<tr>';
					htmlHeader+='<td>Variabel</td>';
					htmlHeader+='<td>Frekuensi</td>';
					htmlHeader+='<td>Titik Tengah</td>';
					htmlHeader+='<td>Frekuensi Relatif</td>';
					htmlHeader+='<td>Frekuensi Kumulatif</td>';
					htmlHeader+='<td>Persentase Frekuensi Relatif(%)</td>';
					htmlHeader+='</tr>';

					//ambil total frekuensi
					var totalFrek = 0;
					var frek = 0;
					for(var i=1; i<=countRowKelompok; i++)
					{
						totalFrek += parseInt($$('#odRowFrekuensiKelompok'+i).val());
					}

					for(var i=1; i<=countRowKelompok; i++)
					{
						var variable = $$('#odRowVariabelKelompok'+i).val();
						arrVariable[i-1] = variable;
						var batasBawah = parseFloat(variable.split('-')[0]);
						var batasAtas = parseFloat(variable.split('-')[1]);
						frek = $$('#odRowFrekuensiKelompok'+i).val()*1;
						arrFrek[i-1] = frek;
						htmlTable += '<tr>';
						htmlTable += '<td><input type=\"text\" value=\"'+variable+'\"></td>';
						htmlTable += '<td><input class="odGrafikRFT" type=\"number\" value=\"'+frek+'\"></td>';

						titikTengah = (batasBawah+batasAtas)/2;
						htmlTable += '<td><input class="odGrafikRVT" type=\"number\" value=\"'+getKoma(titikTengah, dc)+'\"></td>';

						frekRelatif = getKoma((frek/totalFrek), dc);
						htmlTable += '<td><input type=\"number\" value=\"'+frekRelatif+'\"></td>';

						frekKumulatif+=parseInt(frek);
						htmlTable += '<td><input type=\"number\" value=\"'+frekKumulatif+'\"></td>';
						htmlTable += '<td><input type=\"number\" value=\"'+getKoma((frekRelatif*100), dc)+'\"></td>';
						htmlTable += '</tr>';

						//isi array
						if(Number.isInteger(batasBawah))
						{
							arrTB[i-1] = batasBawah-0.5;
						}
						else
						{
							arrTB[i-1] = batasBawah;
						}
						arrVariable[i-1] = batasBawah+'-'+(batasBawah+lebarKelompok);
						arrFrek[i-1] = frek;
						arrFkk[i-1] = frekKumulatif;

						meanKFPenyebut = meanKelompokFunctionPenyebut(frek);
						meanKFPembilang = meanKelompokFunctionPembilang(titikTengah, frek);
						varianKFPembilang = varianKelompokFunctionPembilang(titikTengah, frek);
					}
	  			}
	  			if(cekpodDF == "odDF") {
	  				$$("#odJudulDF").show();
		  			$$("#odLangkahPengerjaan").show();
		  			$$("#odTabelHasil").show();
		  			$$('#odLangkahPengerjaan').html(html);
		  			$$('#odTabelHeader').html(htmlHeader);
		  			$$('#odTabelHasilDFIsi').html(htmlTable);
	  			}
  			}			
// OD: UKURAN PEMUSATAN DATA
			if(cekKosong == 0 && cekpodUKP == "odUKP") {
				if(cekSifat == "kualitatif")
				{
					if(cekFrekuensi == "sudah")
					{
						$$("#odJudulModus").show();
						$$("#odModusLangkahPengerjaan").show();
						var hasil = modusTunggalFrekuensi(arrVariable, arrFrek)
						var arrJawaban = hasil.split('-')[0].split(',');
						$$("#odModusLangkahPengerjaan").html(htmlModusTunggal(arrJawaban));
					}
					else if(cekFrekuensi == "belum")
					{
						$$("#odJudulModus").show();
						$$("#odModusLangkahPengerjaan").show();
						$$("#odModusLangkahPengerjaan").html(modusFunction(nilaiData));
					}
				}
				else if(cekSifat == "kuantitatif")
				{
					if(cekJenisData == "tunggal")
					{
						if(cekFrekuensi == "sudah")
						{
							$$("#odJudulMean").show();
				  			$$("#odMeanLangkahPengerjaan").show();
				  			var mean = meanTunggal(arrVariable, arrFrek);
							$$("#odMeanLangkahPengerjaan").html(htmlMean(arrVariable, arrFrek, "tunggal"));

							$$("#odJudulMedian").show();
							$$("#odMedianLangkahPengerjaan").show();
							alert(arrVariable+'-'+arrFkk+'-'+arrFrek.length);
							hasilMedian = medianTunggalFrekuensi(arrVariable,arrFkk);
							$$("#odMedianLangkahPengerjaan").html(htmlMedianTunggalFrekuensi(arrFkk, hasilMedian));

							$$("#odJudulModus").show();
							$$("#odModusLangkahPengerjaan").show();
							var hasil = modusTunggalFrekuensi(arrVariable, arrFrek)
							var arrJawaban = hasil.split('-')[0].split(',');
							$$("#odModusLangkahPengerjaan").html(htmlModusTunggal(arrJawaban));
						}
						else if(cekFrekuensi == "belum")
						{
							$$("#odJudulMean").show();
				  			$$("#odMeanLangkahPengerjaan").show();
							$$("#odMeanLangkahPengerjaan").html(meanFunction(nilaiData));

							$$("#odJudulMedian").show();
							$$("#odMedianLangkahPengerjaan").show();
							$$("#odMedianLangkahPengerjaan").html(medianFunction(nilaiData));

							$$("#odJudulModus").show();
							$$("#odModusLangkahPengerjaan").show();
							$$("#odModusLangkahPengerjaan").html(modusFunction(nilaiData));
						}
					}
					else if(cekJenisData == "berkelompok")
					{
						$$("#odJudulMean").show();
			  			$$("#odMeanLangkahPengerjaan").show();
			  			var mean = meanKelompok(arrVariable, arrFrek);
						$$("#odMeanLangkahPengerjaan").html(htmlMean(arrVariable, arrFrek, "kelompok"));

						$$("#odJudulMedian").show();
						$$("#odMedianLangkahPengerjaan").show();
						var hasilMedian = medianKelompok(arrVariable, arrFrek, arrFkk, cekJenisVariabel);
						$$("#odMedianLangkahPengerjaan").html(htmlMedianTunggalFrekuensi(arrFkk, hasilMedian));

						$$("#odJudulModus").show();
						$$("#odModusLangkahPengerjaan").show();
						var hasilModus = modusKelompok(arrVariable,arrFrek,cekJenisVariabel);
						$$("#odModusLangkahPengerjaan").html(htmlModusKelompok(arrVariable,arrFrek,cekJenisVariabel));	
					}
				}	
  			}
// OD: UKURAN LOKASI
  			if(cekKosong == 0 && cekpodUL == "odUL" && cekSifat == "kuantitatif") {
  				var nomorKuartil = 1;
  				var nomorDesil = 1;
  				var nomorPersentil = 1;

  				// Kuartil
  				$$('input[type=radio]').change(function()
		  		{
		  			var valKuartil=$$('input[type=radio][name=od-letak-kuartil]:checked').val();
		            cekKuartil=valKuartil;

			        //----- Tampilkan RadioButton -----//
					if(cekKuartil == 'Q1')
			        {
			        	nomorKuartil = 1;
			        }
			        else if (cekKuartil =="Q2") {
			        	nomorKuartil = 2;
			        }
			        else {
			        	nomorKuartil = 3;
			        }
		  		});
  				// Desil
  				var valDesil = $$('#od-letak-desil').val();
				cekDesil = valDesil;

				if (cekDesil == "") {
					alert("Letak desil belum diisi");
					nomorDesil = 1;
					document.getElementById("od-letak-desil").value = "1";
				}
				else if(cekDesil > 9 || cekDesil < 0) {
					alert("Letak desil di luar jangkauan");
					nomorDesil = 1;
					document.getElementById("od-letak-desil").value = "1";
	  			}
	  			else {
	  				nomorDesil = cekDesil;
	  			}
	  			// Persentil
	  			var valPersentil = $$('#od-letak-persentil').val();
				cekPersentil = valPersentil;

				if (cekPersentil == "") {
					alert("Letak persentil belum diisi");
					nomorPersentil = 1;
					document.getElementById("od-letak-persentil").value = "1";
				}
				else if(cekPersentil > 99 || cekPersentil < 0) {
					alert("Letak persentil di luar jangkauan");
					document.getElementById("od-letak-persentil").value = "1";
	  			}
	  			else {
	  				nomorPersentil = cekPersentil;
	  			}

	  			// tampilan
	  			if(cekJenisData == 'tunggal') {
	  				if(cekFrekuensi == 'belum')
	  				{
	  					$$("#odJudulKuartil").show();
						$$("#odKuartilLangkahPengerjaan").show();
						$$("#odKuartilLangkahPengerjaan").html(kuartilFunction(nilaiData, nomorKuartil));

						$$("#odJudulDesil").show();
						$$("#odDesilLangkahPengerjaan").show();
						$$("#odDesilLangkahPengerjaan").html(desilFunction(nilaiData, nomorDesil));

						$$("#odJudulPersentil").show();
						$$("#odPersentilLangkahPengerjaan").show();
						$$("#odPersentilLangkahPengerjaan").html(persentilFunction(nilaiData, nomorPersentil));
	  				}
	  				else if(cekFrekuensi == 'sudah')
	  				{
	  					$$("#odJudulKuartil").show();
						$$("#odKuartilLangkahPengerjaan").show();
						$$("#odKuartilLangkahPengerjaan").html(kuartilFrekuensiFunction(arrVariable, arrFkk, nomorKuartil));

						$$("#odJudulDesil").show();
						$$("#odDesilLangkahPengerjaan").show();
						$$("#odDesilLangkahPengerjaan").html(desilFrekuensiFunction(arrVariable, arrFkk, nomorDesil));

						$$("#odJudulPersentil").show();
						$$("#odPersentilLangkahPengerjaan").show();
						$$("#odPersentilLangkahPengerjaan").html(persentilFrekuensiFunction(arrVariable, arrFkk, nomorPersentil));
	  				}
		  		}
		  		else{
		  			$$("#odJudulKuartil").show();
					$$("#odKuartilLangkahPengerjaan").show();
					$$("#odKuartilLangkahPengerjaan").html(kuartilKelompokFunction(nomorKuartil, arrFkk, arrTB));

					$$("#odJudulDesil").show();
					$$("#odDesilLangkahPengerjaan").show();
					$$("#odDesilLangkahPengerjaan").html(desilKelompokFunction(nomorDesil, arrFkk, arrTB));

					$$("#odJudulPersentil").show();
					$$("#odPersentilLangkahPengerjaan").show();
					$$("#odPersentilLangkahPengerjaan").html(persentilKelompokFunction(nomorPersentil, arrFkk, arrTB));
		  		}
	  		}
// OD: UKURAN PENYEBARAN DATA
	  		if(cekKosong == 0 && cekpodUPD == "odUPD"  && cekSifat == "kuantitatif") {

  				$$('input[type=radio]').change(function()
		  		{
		  			var valVarian=$$('input[type=radio][name=pengamatan-upd]:checked').val();
		            cekVarian=valVarian;
		            console.log(cekVarian);
		  		});

	  			// tampilan
	  			if (cekJenisData == 'tunggal') 
	  			{
	  				if(cekFrekuensi == 'belum')
	  				{
	  					$$("#odJudulVarian").show();
						$$("#odVarianLangkahPengerjaan").show();
						$$("#odVarianLangkahPengerjaan").html(varianFunction(nilaiData, cekVarian));

						$$("#odJudulSD").show();
						$$("#odSDLangkahPengerjaan").show();
						$$("#odSDLangkahPengerjaan").html(sdFunction(nilaiData, cekVarian));
	  				}
	  				else
	  				{
	  					$$("#odJudulVarian").show();
						$$("#odVarianLangkahPengerjaan").show();
						$$("#odVarianLangkahPengerjaan").html(varianFrekuensiFunction(arrVariable, arrFrek, cekVarian));

						$$("#odJudulSD").show();
						$$("#odSDLangkahPengerjaan").show();
						$$("#odSDLangkahPengerjaan").html(sdFrekuensiFunction(arrVariable, arrFrek, cekVarian));
	  				}
  					
  				}
  				else 
  				{
  					$$("#odJudulVarian").show();
					$$("#odVarianLangkahPengerjaan").show();
					$$("#odVarianLangkahPengerjaan").html(varianKelompokFunction(arrVariable, arrFrek, cekVarian));

					$$("#odJudulSD").show();
					$$("#odSDLangkahPengerjaan").show();
					$$("#odSDLangkahPengerjaan").html(sdKelompokFunction(arrVariable, arrFrek, cekVarian));
  				}
  			}
// OD: GRAFIK
  			if (cekKosong == 0 && cekpodGrafik == "odGrafik") {
  				if(cekSifat == 'kuantitatif') {
  					$$("#odJudulGrafik").show();
	  				$$(".od-grafik-kuanti").show();
	  				$$(".od-grafik-kuali").hide();

	  				$$('#odJudulHisto').show();
	  				$$("#odHistoLangkahPengerjaan").show();
		  			$$("#odHistoChart").show();
		   			//langkah-langkah
		  			var htmlHisto = "";
		  			htmlHisto = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah kelas variabel yang diamati</li>';
					htmlHisto += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
					htmlHisto += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';

					$$('#odJudulPoligon').show();
					$$("#odPoligonLangkahPengerjaan").show();
		  			$$("#odPoligonChart").show();
		   			//langkah-langkah
		  			var htmlPoligon = "";
		  			htmlPoligon = '<li><b>Langkah 1:</b><br> Cari titik tengah tiap kelas.</li>';
					htmlPoligon += '<li><b>Langkah 2:</b><br> Garis horizontal dibuat dengan berisi nilai titik tengah tiap kelas</li>';
					htmlPoligon += '<li><b>Langkah 3:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
					htmlPoligon += '<li><b>Langkah 4:</b><br> Titik dibuat setinggi frekuensi tiap kelas, lalu tarik garis antar titik yang dibuat</li>';
		  			//tampilkan grafik
		  			var arrObject=new Array(); //warna, nama var, dan nilai
		  			var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
		  			
		  			var msg="";
		  			$$('.odGrafikRVT').each(function(i, obj) {
						  
						  var obj=new Object();
						  obj.variable=$(this).val();
						  obj.value=0;
						  

						  var ix=0;
						  var found=false;
						  while (ix<arrObject.length && !found) //panjang obj = length
						  {
						  	if (arrObject[ix].variable==obj.variable) //jika ada var yg sama
						  	{
						  		found=true;
						  		msg=msg+"Variable "+obj.variable+" sudah digunakan\n";
						  	}
						  	ix++;
						  }

						  if (!found)
						  {
						  	//arrColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
						  	arrObject.push(obj);
						  	console.log(obj);
						  }
				    });

				    var ctr=0;
				    $$('.odGrafikRFT').each(function(i, obj) {
						  if (ctr<arrObject.length)
						  {
						  	arrObject[ctr].value=$(this).val();
						  }
						  ctr++;
				    });

				    // Cek error
				    if (msg=="")
				    {
				    	console.log("abc");
						$$("#odHistoLangkahPengerjaan").html(htmlHisto);
				    	var valX=1;
				    	//odHistoChart itu kontainer, histoChartX = chartnya
			  			$$("#odHistoChart").html("<div id='histoChartX' style='height:250px'></div>");
			  			new Morris.Bar({
						  element: 'histoChartX',
						  data: arrObject,
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[row.x];
						  },
						  parseTime:false,
						  barSizeRatio:valX
						});

						$$("#odPoligonLangkahPengerjaan").html(htmlPoligon);
			    		$$("#odPoligonChart").html("<div id='poligonChartY' style='height:250px'></div>");
			  			new Morris.Line({
						  element: 'poligonChartY',
						  data: arrObject,
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[row.x];
						  },
						  parseTime:false
						});
				    }
				    else {
				    	alert(msg);
				    }
  				}
  				else {
  					$$("#odJudulGrafik").show();
  					$$("#od-grafik-kuanti").hide();
  					$$("#od-grafik-kuali").show();

  					$$("#odJudulLingkaran").show();
  					$$("#odLingkaranLangkahPengerjaan").show();
		  			$$("#odLingkaranChart").show();
		   			//langkah-langkah
		  			var htmlLingkaran = "";
		  			htmlLingkaran = '<li><b>Langkah 1:</b><br> Cek data apakah sudah frekuensi sudah dalam bentuk presentase atau belum, jika belum ubah semua frekuensi data tersebut ke dalam bentuk persentase dengan cara data ke-x dibagi total frekuensi dikali 100%</li>';
					htmlLingkaran += '<li><b>Langkah 2:</b><br> Mencari besar sudut yang mewakili nilai masing-masing data dengan cara banyak data ke-x dibagi total frekuensi dikali 360 derajat</li>';
					htmlLingkaran += '<li><b>Langkah 3:</b><br> Gambar grafik dengan bantuan sudut penggaris</li>';
					htmlLingkaran += '<li><b>Langkah 4:</b><br> Tuliskan keterangan pada daerah dalam diagram berupa nama variabel dan persentasenya</li>';
					$$("#odLingkaranLangkahPengerjaan").html(htmlLingkaran);

					$$("#odJudulBatang").show();
					$$("#odBatangLangkahPengerjaan").show();
		  			$$("#odBatangChart").show();
		   			//langkah-langkah
		  			var htmlBatang = "";
		  			htmlBatang = '<li><b>Langkah 1:</b><br> Garis horizontal dibuat dengan berisi variabel yang diamati</li>';
					htmlBatang += '<li><b>Langkah 2:</b><br> Garis vertikal dibuat dengan berisi skala frekuensi</li>';
					htmlBatang += '<li><b>Langkah 3:</b><br> Tinggi batang dibuat setinggi frekuensi tiap kelas. Kemudian, tarik garis vertikal sesuai angka yang ada di garis horizontal (batas bawah nyata kelas ke-x)</li>';
					$$("#odLingkaranLangkahPengerjaan").html(htmlBatang);
					
		  			//tampilkan grafik
		  			var arrObject=new Array(); //warna, nama var, dan 
		  			var arrObjectBatang= new Array();
		  			var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
		  			
		  			var msg="";
				    var ctr = 1;
				    $$('.odGrafikRFT').each(function(i, obj) {
				    	//var label = document.getElementById(""+ctr).value;
				    	var value = $$(this).val();

				    	//console.log(label+","+value);
				    	var object = {
				    		label: "",
				    		value: value*1
				    	}
				    	arrObject.push(object);
						  ctr++;
				    });

				    ctr=0;
				    $$('.odGrafikRVT').each(function(i, obj) {
				    	//var label = document.getElementById(""+ctr).value;
				    	var label = $$(this).val();
				    	arrObject[ctr].label=label;
						ctr++;
				    });

				    // BATANG
				    $$('.odGrafikRVT').each(function(i, obj) {
						  
						  var objBatang =new Object();
						  objBatang.variable=$(this).val();
						  objBatang.value=0;
						  

						  var ix=0;
						  var found=false;
						  while (ix<arrObjectBatang.length && !found) //panjang obj = length
						  {
						  	if (arrObjectBatang[ix].variable==objBatang.variable) //jika ada var yg sama
						  	{
						  		found=true;
						  		msg=msg+"Variable "+objBatang.variable+" sudah digunakan\n";
						  	}
						  	ix++;
						  }

						  if (!found)
						  {
						  	//arrColors.push('#'+Math.floor(Math.random()*16777215).toString(16));
						  	arrObjectBatang.push(objBatang);
						  	console.log(objBatang);
						  }
				    });

				    var ctr=0;
				    $$('.odGrafikRFT').each(function(i, obj) {
						  if (ctr<arrObjectBatang.length)
						  {
						  	arrObjectBatang[ctr].value=$(this).val();
						  }
						  ctr++;
				    });


				    if (msg=="")
				    {
				    	$$("#od-grafik-kuali").show();
				    	console.log("lingkaran");
				    	console.log(arrObject);
			  			$$("#odLingkaranChart").html("<div id='lingkaranChartX'></div>");
						new Morris.Donut({
						  element: 'lingkaranChartX',
						  data: arrObject
						  
						});
						
			  			$$("#odBatangChart").html("<div id='batangChartX'></div>");
			  			new Morris.Bar({
						  element: 'batangChartX',
						  data: arrObjectBatang,
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[row.x];
						  },
						  parseTime:false
						});
				    }
				    else {
				    	alert(msg);
				    }
  				}
  				
  			}
  		});
	}
	else if (page.name == "ruang-uji") {
		$$('#ruKerjakan').click(function()
  		{
  			var selected = [];
			$('[name="ru-materi"]:checked').each(function(checkbox) {
					selected.push($$(this).val());
			});
			var timer = $$('#ru-timer').val();
			var soal = $$('#ru-soal').val();
			var jumlah_soal = $$('input[name=ru-jumlah-soal]:checked').val();
			// alert(timer);

			// console.log("before");
			localStorage.setItem("check",JSON.stringify(selected));
			localStorage.setItem("timer",timer);
			localStorage.setItem("jumlah_soal",jumlah_soal);
			page.router.navigate('/ru-soal/');
			//console.log(selected);
  			//console.log("click");
  		});	
	}
	else if (page.name == "ru-soal") {
		var html = "";
		var ctr=1;
		var item=JSON.parse(localStorage.getItem("check"));
		var soal = localStorage.getItem("jumlah_soal");
		var ctr = item.length * soal;
		// alert(ctr);

		//tampilkan nomor soal dan jawabannya
		for(i=1; i <= ctr; i++) {
			$$("#ru-ns"+i).show();
		}
		
		var index = 1;
		$$(".ru-ns-class").click(function()
	    {
	    	index = $$(this).attr('index');
	    	nomorSoal(index, ctr);
	    });

		var object = [];
		var items = 0;
		for (var i=0;i<item.length;i++)
		{
			if(soal == 1){
				if(item[i] == "ruDF")
				{
					buatSoalDF();
					shuffle(arrSoalDF);

					while(arrSoalDF[0].jawaban == "NaN" || arrSoalDF[1].jawaban == "NaN" || arrSoalDF[2].jawaban == "NaN" ){
						shuffle(arrSoalDF);
					}

					object[items] = arrSoalDF[0];
					items++;
				}
				else if(item[i] == "ruGrafik")
				{
					buatSoalGrafik();
					shuffle(arrSoalHisto);
					shuffle(arrSoalPoligon);
					shuffle(arrSoalLingkaran);
					shuffle(arrSoalBatang);

					var arrSoalGrafik = [];
					arrSoalGrafik[0] = arrSoalHisto[0];
					arrSoalGrafik[1] = arrSoalPoligon[0];
					arrSoalGrafik[2] = arrSoalLingkaran[0];
					arrSoalGrafik[3] = arrSoalBatang[0];

					shuffle(arrSoalGrafik);

					object[items] = arrSoalGrafik[0];
					items++;
				}
				else if (item[i]=="ruUKP")
				{
					buatSoalUKP();
					shuffle(arrSoalMean);
					shuffle(arrSoalMedian);
					shuffle(arrSoalModus);

					while(arrSoalMean[0].jawaban == "NaN" || arrSoalMedian[0].jawaban == "NaN" || arrSoalModus[0].jawaban == "NaN" ){
						shuffle(arrSoalMean);
						shuffle(arrSoalMedian);
						shuffle(arrSoalModus);
					}

					var random = Math.floor(Math.random() * (+3 - +1)) + +1;
					if(random == 1)
					{
						//median
						object[items] = arrSoalMedian[0];
						items++;
					}
					else if(random == 2)
					{
						//modus
						object[items] = arrSoalModus[0];
						items++;
					}
					else
					{
						object[items] = arrSoalMean[0];
						items++;
					}
				}
				else if(item[i] == "ruUL")
				{
					buatSoalUL();
					shuffle(arrSoalKuartil);
					shuffle(arrSoalDesil);
					shuffle(arrSoalPersentil);

					while(arrSoalKuartil[0].jawaban == "NaN" || arrSoalDesil[0].jawaban == "NaN" || arrSoalPersentil[0].jawaban == "NaN" ){
						shuffle(arrSoalKuartil);
						shuffle(arrSoalDesil);
						shuffle(arrSoalPersentil);
					}

					var random = Math.floor(Math.random() * (+2 - +1)) + +1;
					if(random == 1)
					{
						//desil
					    object[items] = arrSoalDesil[0];
						items++;
					}
					else if(random == 2)
					{
						//kuartil
						object[items] = arrSoalKuartil[0];
						items++;
					}
					else
					{
						//persentil
					    object[items] = arrSoalPersentil[0];
						items++;
					}
				}
				else if(item[i] == "ruUPD")
				{
					buatSoalUPK();
					shuffle(arrSoalVarian);
					shuffle(arrSoalSD);

					while(arrSoalVarian[0].jawaban == "NaN" || arrSoalSD[0].jawaban == "NaN" ){
						shuffle(arrSoalVarian);
						shuffle(arrSoalSD);
					}

					var random = Math.floor(Math.random() * (+2 - +1)) + +1;
					if(random == 1) //varian
					{
						//varian
						object[items] = arrSoalVarian[0];
						items++;
					}
					if(random == 2) //SD
					{
						//standar deviasi
						object[items] = arrSoalSD[0];
						items++;
					}
				}	
			}
			else if(soal == 2){
				if(item[i] == "ruDF")
				{
					buatSoalDF();
					shuffle(arrSoalDF);

					while(arrSoalDF[0].jawaban == "NaN" || arrSoalDF[1].jawaban == "NaN" || arrSoalDF[2].jawaban == "NaN" ){
						shuffle(arrSoalDF);
					}

					object[items] = arrSoalDF[0];
					items++;

					object[items] = arrSoalDF[1];
					items++;
				}
				else if(item[i] == "ruGrafik")
				{
					buatSoalGrafik();
					shuffle(arrSoalHisto);
					shuffle(arrSoalPoligon);
					shuffle(arrSoalLingkaran);
					shuffle(arrSoalBatang);

					var arrSoalGrafik = [];
					arrSoalGrafik[0] = arrSoalHisto[0];
					arrSoalGrafik[1] = arrSoalPoligon[0];
					arrSoalGrafik[2] = arrSoalLingkaran[0];
					arrSoalGrafik[3] = arrSoalBatang[0];

					shuffle(arrSoalGrafik);

					object[items] = arrSoalGrafik[0];
					items++;

					object[items] = arrSoalGrafik[1];
					items++;
				}
				else if (item[i]=="ruUKP")
				{
					buatSoalUKP();
					shuffle(arrSoalMean);
					shuffle(arrSoalMedian);
					shuffle(arrSoalModus);

					while(arrSoalMean[0].jawaban == "NaN" || arrSoalMedian[0].jawaban == "NaN" || arrSoalModus[0].jawaban == "NaN" ){
						shuffle(arrSoalMean);
						shuffle(arrSoalMedian);
						shuffle(arrSoalModus);
					}

					object[items] = arrSoalMean[0];
					items++;

					var random = Math.floor(Math.random() * (+2 - +1)) + +1;
					if(random == 1)
					{
						//median
						object[items] = arrSoalMedian[0];
						items++;
					}
					else
					{
						//modus
						object[items] = arrSoalModus[0];
						items++;
					}
				}
				else if(item[i] == "ruUL")
				{
					buatSoalUL();
					shuffle(arrSoalKuartil);
					shuffle(arrSoalDesil);
					shuffle(arrSoalPersentil);

					while(arrSoalKuartil[0].jawaban == "NaN" || arrSoalDesil[0].jawaban == "NaN" || arrSoalPersentil[0].jawaban == "NaN" ){
						shuffle(arrSoalKuartil);
						shuffle(arrSoalDesil);
						shuffle(arrSoalPersentil);
					}

				    object[items] = arrSoalKuartil[0];
					items++;

					var random = Math.floor(Math.random() * (+2 - +1)) + +1;
					if(random == 1)
					{
						//desil
					    object[items] = arrSoalDesil[0];
						items++;
					}
					else
					{
						//persentil
					    object[items] = arrSoalPersentil[0];
						items++;
					}
				}
				else if(item[i] == "ruUPD")
				{
					buatSoalUPK();
					shuffle(arrSoalVarian);
					shuffle(arrSoalSD);

					while(arrSoalVarian[0].jawaban == "NaN" || arrSoalSD[0].jawaban == "NaN" ){
						shuffle(arrSoalVarian);
						shuffle(arrSoalSD);
					}

					//varian
					object[items] = arrSoalVarian[0];
					items++;

					//standar deviasi
					object[items] = arrSoalSD[0];
					items++;
				}
			}
			else if(soal == 3){
				if(item[i] == "ruDF")
				{
					buatSoalDF();
					shuffle(arrSoalDF);

					while(arrSoalDF[0].jawaban == "NaN" || arrSoalDF[1].jawaban == "NaN" || arrSoalDF[2].jawaban == "NaN" ){
						shuffle(arrSoalDF);
					}

					object[items] = arrSoalDF[0];
					items++;

					object[items] = arrSoalDF[1];
					items++;

					object[items] = arrSoalDF[2];
					items++;
				}
				else if(item[i] == "ruGrafik")
				{
					buatSoalGrafik();
					shuffle(arrSoalHisto);
					shuffle(arrSoalPoligon);
					shuffle(arrSoalLingkaran);
					shuffle(arrSoalBatang);

					var arrSoalGrafik = [];
					arrSoalGrafik[0] = arrSoalHisto[0];
					arrSoalGrafik[1] = arrSoalPoligon[0];
					arrSoalGrafik[2] = arrSoalLingkaran[0];
					arrSoalGrafik[3] = arrSoalBatang[0];

					shuffle(arrSoalGrafik);

					object[items] = arrSoalGrafik[0];
					items++;

					object[items] = arrSoalGrafik[1];
					items++;

					object[items] = arrSoalGrafik[2];
					items++;
				}
				else if (item[i]=="ruUKP")
				{
					buatSoalUKP();
					shuffle(arrSoalMean);
					shuffle(arrSoalMedian);
					shuffle(arrSoalModus);

					while(arrSoalMean[0].jawaban == "NaN" || arrSoalMedian[0].jawaban == "NaN" || arrSoalModus[0].jawaban == "NaN" ){
						shuffle(arrSoalMean);
						shuffle(arrSoalMedian);
						shuffle(arrSoalModus);
					}

					object[items] = arrSoalMean[0];
					items++;

					//median
					object[items] = arrSoalMedian[0];
					items++;

					//modus
					object[items] = arrSoalModus[0];
					items++;
				}
				else if(item[i] == "ruUL")
				{
					buatSoalUL();
					shuffle(arrSoalKuartil);
					shuffle(arrSoalDesil);
					shuffle(arrSoalPersentil);

					while(arrSoalKuartil[0].jawaban == "NaN" || arrSoalDesil[0].jawaban == "NaN" || arrSoalPersentil[0].jawaban == "NaN" ){
						shuffle(arrSoalKuartil);
						shuffle(arrSoalDesil);
						shuffle(arrSoalPersentil);
					}

				    object[items] = arrSoalKuartil[0];
					items++;

				    //desil
				    object[items] = arrSoalDesil[0];
					items++;

				    //persentil
				    object[items] = arrSoalPersentil[0];
					items++;
				}
				else if(item[i] == "ruUPD")
				{
					buatSoalUPK();
					shuffle(arrSoalVarian);
					shuffle(arrSoalSD);

					var random = Math.floor(Math.random() * (+2 - +1)) + +1;
					if(random == 1) //varian 2 + SD 1
					{
						while(arrSoalVarian[0].jawaban == "NaN" || arrSoalVarian[1].jawaban == "NaN" || arrSoalSD[0].jawaban == "NaN" ){
							shuffle(arrSoalVarian);
							shuffle(arrSoalSD);
						}
						//varian
						object[items] = arrSoalVarian[0];
						items++;

						object[items] = arrSoalVarian[1];
						items++;

						//standar deviasi
						object[items] = arrSoalSD[0];
						items++;
					}
					if(random == 2) //varian 1 + SD 2
					{
						while(arrSoalVarian[0].jawaban == "NaN" || arrSoalSD[1].jawaban == "NaN" || arrSoalSD[0].jawaban == "NaN" ){
							shuffle(arrSoalVarian);
							shuffle(arrSoalSD);
						}
						//varian
						object[items] = arrSoalVarian[0];
						items++;

						//standar deviasi
						object[items] = arrSoalSD[0];
						items++;

						object[items] = arrSoalSD[1];
						items++;
					}
				}
			}
			
		}
		// alert(object[2].arrOpsi);
		//masukkan soal
		for(var i=0; i<object.length; i++)
		{
			var html = "";
			var temp = object[i].jawaban.toString().split('-');
			// alert(temp[0]);
			if(temp[0] == "grafik")
			{
				html+="<ul class=\'csoal"+(i+1)+"\' style=\'display:none;padding: 0%; list-style-type: none;\'>";
				html+="<li><h2>Soal "+(i+1)+"</h2></li>"
			    html+="<div id=\'exTab1\' class=\'container\'>";
			    html+="<li>"+object[i].soal+"</li>";
			    html+="</ul>";
			    shuffle(object[i].arrOpsi);
			    html+="<div id=\'opsi-jawaban"+(i+1)+"\' class=\'csoal"+(i+1)+" gambar-grafik\'>";
			    for(var a=0; a<2; a++)
			    {
			     	html+="<input type=\'radio\' name=\'opsi"+(i+1)+"\' value=\'"+object[i].arrOpsi[a][0].jawaban+"\'>";
			     	html+="<div id=\'opsi-grafik"+(i+1)+(a+1)+"\'></div>";
			    }
			    html+="</div>";
			    html+="<ul class=\'csoal"+(i+1)+"\' style=\'display:none;padding: 0%; list-style-type: none;\'>";
			    html+="<div id=\'ru-jawaban"+(i+1)+"\' style=\'display:none;\'>";
			    html+="<li style=\'color: #325d79;\'><b>Jawaban</b></li>";
			    html+="<li id=\'jawaban"+(i+1)+"\' jawaban=\'true\'></li>";
			    html+="</div>";
			    html+="<div id=\'langkah-kerja"+(i+1)+"\' style=\'display:none;\'>";
			    html+=object[i].langkahKerja;
			    html+="</div>";
			    html+="</ul>";
			}
			else
			{
				html+="<ul class=\'csoal"+(i+1)+"\' style=\'display:none;padding: 0%; list-style-type: none;\'>";
				html+="<li><h2>Soal "+(i+1)+"</h2></li>"
			    html+="<div id=\'exTab"+(i+1)+"\' class=\'container\'>";
			    html+="<li>"+object[i].soal+"</li>";
			    object[i].arrOpsi[3] = object[i].jawaban;
			    shuffle(object[i].arrOpsi);
			    html+="<div id=\'opsi-jawaban"+(i+1)+"\'>";
			    for(var a=0; a<4; a++)
			    {
			     html+="<input type=\'radio\' name=\'opsi"+(i+1)+"\' value=\'"+object[i].arrOpsi[a]+"\'> "+object[i].arrOpsi[a]+"<br>";
			    }
			    html+="</div>";
			    html+="<div id=\'ru-jawaban"+(i+1)+"\' style=\'display:none;\'>";
			    html+="<li style=\'color: #325d79;\'><b>Jawaban</b></li>";
			    html+="<li id=\'jawaban"+(i+1)+"\' jawaban=\'"+object[i].jawaban+"\'>"+object[i].jawaban+"</li>";
			    html+="</div>";
			    html+="<div id=\'langkah-kerja"+(i+1)+"\' style=\'display:none;\'>";
			    html+=object[i].langkahKerja;
			    html+="</div>";
			    html+="</ul>";
			}
			$$("#ruDF").append(html); //tidak muncul langsung karena display none

			//gambar grafik
			if(temp[0] == "grafik")
			{
			    var arrColors = ['#34495E', '#26B99A',  '#666', '#3498DB','#FF0000'];
			    if(temp[1] == "histogram"){
			    	for(var a=0; a<2; a++)
					{
						new Morris.Bar({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: object[i].arrOpsi[a],
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[a];
						  },
						  parseTime:false,
						  barSizeRatio:1
						});
					}
			    }
				else if(temp[1] == "lingkaran"){
					for(var a=0; a<2; a++)
					{
						var arrLingkaran = new Array();
						for(var x=0; x<object[i].arrOpsi[a].length; x++)
						{
							var obj = new Object();
							obj.label = object[i].arrOpsi[a][x].variable;
							obj.value = object[i].arrOpsi[a][x].value;
							arrLingkaran[x] = obj;
						}

						new Morris.Donut({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: arrLingkaran,
						});
					}
				}	
				else if(temp[1] == "batang"){
			    	for(var a=0; a<2; a++)
					{
						new Morris.Bar({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: object[i].arrOpsi[a],
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[a];
						  },
						  parseTime:false,
						});
					}
			    }
			    else if(temp[1] == "garis"){
			    	for(var a=0; a<2; a++)
					{
						new Morris.Line({
						  element: 'opsi-grafik'+(i+1)+(a+1),
						  data: object[i].arrOpsi[a],
						  xkey: 'variable',
						  ykeys: ['value'],
						  labels: ['Value'], //label keterangan pas bar di klik
						  barColors: function (row, series, type) {
						        return arrColors[a];
						  },
						  parseTime:false,
						});
					}
			    }
			}
		}
		$$('.csoal1').show(); //tampilin soal yang pertama
		$$('.gambar-grafik').hide();
		//console.log(item);

		//check radio button opsi
		var salah = ctr;
		var done = 0;
		$$('input[type=radio]').on('click', function()
		{
			var jawaban = $$(this).val();
			$$('#ru-jawaban'+index).show();
			$$('#langkah-kerja'+index).show();
			$$('#opsi-jawaban'+index).addClass("disabled");
			done++;

			var jawabBenar = $$('#jawaban'+index).attr('jawaban');
			if(jawaban == jawabBenar) //benar
			{
				// alert("benar");
				$$('#td-ru-ns'+index).css('background', '#d8fa98');
				salah--;
			}
			else //salah
			{
				// alert("salah");
				$$('#td-ru-ns'+index).css('background', '#ffad9e');
			}
		});

		//timer
		var timer=localStorage.getItem("timer");
		var totalDetik = timer*60;
		var thread = setInterval(function()
		{
			var jam = Math.floor(totalDetik / 3600);
			var menit = Math.floor(totalDetik % 3600 / 60);
			var detik = Math.floor(totalDetik % 3600 % 60);
			// alert(totalDetik);
			$$('#timer').text(jam+":"+menit+":"+detik);
			totalDetik--;

			if(totalDetik == 0)
			{
				//disable semua opsi
				for(var i=1; i<=ctr; i++){
					$$('#opsi-jawaban'+i).addClass("disabled");
				}

				//hitung waktu kerja
				var total_detik_kerja = timer*60;
				var jam_kerja = Math.floor(total_detik_kerja / 3600);
				var menit_kerja = Math.floor(total_detik_kerja % 3600 / 60);
				var detik_kerja = Math.floor(total_detik_kerja % 3600 % 60);
				var strWaktuKerja = jam_kerja+":"+menit_kerja+":"+detik_kerja;

				//routing ke akhiri soal
				timer = 0;
				var jumlahSoal = ctr;
				var benar = jumlahSoal-salah;
				var score = benar*100/jumlahSoal;

				clearInterval(thread);
				$$('#timer').text("00:00:00");

				localStorage.setItem("score",score);
				localStorage.setItem("wrong",salah);
				localStorage.setItem("correct",benar);
				localStorage.setItem("time",strWaktuKerja);
				page.router.navigate('/ru-akhiri/');
			}
		}, 1000);

		$$('#back-ruang-uji').click(function()
		{
			clearInterval(thread);
			$$('#timer').text("00:00:00");
		});

		$$('#button-akhiri').on('click',function()
		{
			//hitung waktu kerja
			var total_detik_kerja = (timer*60) - totalDetik;
			var jam_kerja = Math.floor(total_detik_kerja / 3600);
			var menit_kerja = Math.floor(total_detik_kerja % 3600 / 60);
			var detik_kerja = Math.floor(total_detik_kerja % 3600 % 60);
			var strWaktuKerja = jam_kerja+":"+menit_kerja+":"+detik_kerja;

			var jumlahSoal = ctr;
			var benar = jumlahSoal-salah;
			var score = benar*100/jumlahSoal;
			if(done == jumlahSoal){
				//stop timer
				clearInterval(thread);

				localStorage.setItem("score",score);
				localStorage.setItem("wrong",salah);
				localStorage.setItem("correct",benar);
				localStorage.setItem("time",strWaktuKerja);
				page.router.navigate('/ru-akhiri/');	
			}
			else{
				alert("Tidak bisa mengakhiri sebelum menyelesaikan latihan soal.");
			}
		});
		
	}
	else if (page.name=="ru-akhiri") {
		var item=JSON.parse(localStorage.getItem("check"));
		var score=localStorage.getItem("score");
		var salah=localStorage.getItem("wrong");
		var benar=localStorage.getItem("correct");
		var waktu_kerja = localStorage.getItem("time");
		// alert(score+"-"+salah+"-"+benar);

		var soal = ambilTipeSoal(item);

		var html = "<li>Nilai Anda<h2 id=\'ru-akhir-nilai\'>"+score+"</h2></li>";
		html += "<li>"+benar+" soal jawaban benar</li>";
		html += "<li>"+salah+" soal jawaban salah</li>";
		html += "<li>Waktu pengerjaan "+waktu_kerja+"</li>";
		if(score == 100){
			html += "<li><h2>SEMPURNA!<br></h2>Tetap pertahankan penguasaan materi Anda!</li>";
		}
		else if(score >= 80 && score < 100){
			html += "<li><h2>HEBAT!<br></h2>Percobaan yang bagus, Anda hampir menguasai semua materi!</li>";
		}
		else if(score >= 60 && score < 80){
			html += "<li><h2>SEMANGAT!<br></h2>Ayo! Asah pengusaan materi Anda lagi!</li>";
		}
		else{
			html += "<li><h2>AYO BERJUANG!<br></h2>Anda perlu banyak belajar, semua akan mudah jika sering latihan.</li>";
		}
		html += "<li><h3>Topik Latihan Soal:</h3></li>";
		html += "<li>"+soal+"</li>";
		$$('#container-hasilRU').html(html);

		$$('#ru-lihat').on('click',function()
		{
			page.router.back();
		});

		$$('#ru-tidak').on('click',function()
		{
			page.router.navigate('/ruang-uji/');
		});
	}
	else if (page.name == "cara-penggunaan") {
		$$("#back-to-top-cp").on('click', function() {
			$$('#wadahCP').scrollTop(0, 300);
		});
	}
	else if (page.name == "pengaturan") {
		if (localStorage.getItem("decimal")!=null)
		{
			var nl=localStorage.getItem("decimal");
			$$("#p-jumlah-desimal").val(nl);	
		}
		//alert("in page pengaturan");
		
		$$("#btnTerapkan").on('click', function() {
			var jumlahDesimal=$$("#p-jumlah-desimal").val();
			alert(jumlahDesimal);
			localStorage.setItem("decimal", jumlahDesimal);
		});
	}
	else if (page.name == "tentang-aplikasi") {
		$$("#kirim-email").on('click', function() {
		   document.addEventListener('deviceready', function () {
		    // alert('Service is not available');
		    cordova.plugins.email.hasPermission(cordova.plugins.email.permission.GET_ACCOUNTS, function(check) {
		     alert(check);
		    });
		    cordova.plugins.email.open({
		     to:      's160416016@student.ubaya.ac.id',
		     subject: 'Feedback Aplikasi Belajar Statistika Deskriptif',
		     body:    'How are you? Nice greetings from Leipzig'
		    });

		    cordova.plugins.email.open({
		        to:      ['s160416016@student.ubaya.ac.id'],
		        subject: 'Feedback Aplikasi Belajar Statistika Deskriptif',
		        body:    'Hello World',
		        isHtml:  false
		    });
		    
		       // window.plugin.email.isServiceAvailable(
		    //     function (isAvailable) {
		    //         alert(isAvailable);
		    //     }
		    // );

		   }, true);
		});
	}
});