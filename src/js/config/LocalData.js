const localData = {
  telephone: '+38(096)312-82-03',
  email: 'profy.shop.top@gmail.com',
  address: 'г. Николаев, ул. Космонавтов 124Б',
  schedule: 'ПН-ПТ: 10.00 - 17.00',
  instagram: 'https://www.instagram.com/profyshop_top/',
  facebook: 'https://www.facebook.com/profyshoptop',
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1619.1897115256013!2d32.067177559436224!3d46.95890688298181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c5caff9cb8a3c5%3A0xd114e4e38546ffcc!2z0YPQuy4g0JrQvtGB0LzQvtC90LDQstGC0L7QsiwgMTI00JAsINCd0LjQutC-0LvQsNC10LIsINCd0LjQutC-0LvQsNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNTQwMDA!5e0!3m2!1sru!2sua!4v1594713259040!5m2!1sru!2sua'
}

const schema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "name": "Profy Shop Top",
    "image": "https://profy-shop.top/static/img/logo.png",
    "@id": "",
    "url": "https://profy-shop.top",
    "telephone": "+380963128203",
    "priceRange": "300-6000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Космонавтов 124Б, офис 2",
      "addressLocality": "Николаев",
      "postalCode": "54000",
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 0,
      "longitude": 0
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "10:00",
      "closes": "17:00"
    }
  }

export default localData