import Image from "next/image";

const brands = [
  { name: "Shan", src: "/brands/shan.png" },
  { name: "Tapal", src: "/brands/tapal.jpeg" },
  { name: "UnitedKing", src: "/brands/unitedking.jpeg" },
  { name: "fruito", src: "/brands/fruito.jpeg" },
  { name: "Shangrila", src: "/brands/shangrila.png" },
  { name: "Grand-Sweets", src: "/brands/grandsweets.jpeg" },
  { name: "Al-Safa", src: "/brands/alsafa.webp"},
  { name: "telugu-foods", src: "/brands/telugufoods.png"},
  { name: "Lipton", src: "/brands/lipton.png"},
  { name: "Karachi-Bakery", src: "/brands/karachibakery.jpeg"}
];

const stores = [
    { name: "Patel Brothers", src: "/brands/patel-brothers.png" },
    { name: "Al-Hermain", src: "/brands/alhermain.jpg" },
    { name: "Al-Aqsa", src: "/brands/alaqsa.jpeg" },
    { name: "India Grocers", src: "/brands/india-grocers.png" },
];

export function Brands() {
  return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-6 place-items-center mt-3">
        {brands.map((brand, idx) => (
          <div
            key={idx}
            className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={112}
              height={112}
              className="object-contain"
            />
          </div>
        ))}
      </div>
  );
}

export function Stores() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-items-center justify-center mt-3">
      {stores.map((store, idx) => (
        <div
          key={idx}
          className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md flex items-center justify-center"
        >
          <Image
            src={store.src}
            alt={store.name}
            width={112}
            height={112}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

