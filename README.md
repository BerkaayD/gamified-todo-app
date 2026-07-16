# Gamified TODO

React, TypeScript ve TailwindCSS ile hazirlanmis basit bir XP tabanli TODO uygulamasi.

## Ozellikler

- Gorev ekleme, tamamlama, silme ve gunu sifirlama
- Zorluga gore XP kazanimi: Kolay 25, Orta 50, Zor 90
- 250 XP'de bir level atlama
- Gunluk tamamlanma yuzdesi ve level ilerleme barlari
- Gunluk tarih gosterimi ve ileri tarihli gorev planlama
- Tum gorevler tamamlaninca motivasyon mesaji ve seri sayaci
- Verilerin tarayicida `localStorage` ile saklanmasi

## Kod Organizasyonu

- `src/components`: Ekrandaki kartlar, gorev listesi ve form bilesenleri
- `src/hooks`: TODO, XP, streak ve gunluk tamamlama state akisi
- `src/constants`: Oyun kurallari, XP degerleri ve motivasyon mesajlari
- `src/utils`: Tarih, hesaplama ve `localStorage` yardimcilari
- `src/types`: Paylasilan TypeScript tipleri

## Calistirma

```bash
npm install
npm run dev
```

## MSSQL'e Gecis Notu

Bu ornek proje hizli MVP icin veriyi `localStorage` uzerinde tutar. MSSQL eklemek icin bir API katmani olusturup su temel tablolar yeterli olur:

- `Users`: kullanici profili, toplam XP, streak, son mukemmel gun
- `Tasks`: gorev basligi, zorluk, XP, tamamlanma durumu, kullanici iliskisi
- `TaskCompletions`: hangi gorevin hangi gun tamamlandigi

Frontend tarafindaki `tasks` ve `stats` state'leri daha sonra bu API'den okunup guncellenecek sekilde ayrilmaya uygundur.
