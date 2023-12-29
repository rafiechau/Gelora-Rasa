'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const getRandomLocationId = () => {
      return Math.floor(Math.random() * 20) + 1;
    }
    const getRandomCategoriesId = () => {
      return Math.floor(Math.random() * 3) + 1;
    }
    return queryInterface.bulkInsert("Events", [
      {
        eventName: "( PINJAM RIPSTIX ) POUND CLASS TECHNOMART",
        date: new Date("2024-05-15"),
        time: "17:00:00",
        registrationDealine: new Date("2024-04-01"),
        type: "online",
        address : "Perumahan Jalan Danau Bogor Raya, Katulampa, Bogor City, West Java, Indonesia, Bogor Utara, Bogor, Jawa Barat, Indonesia",
        venueName: "Club Bogor Raya",
        status: "active",
        image: "uploads/default1.jpg",
        price: "100000",
        stok: 100,
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        locationId: getRandomLocationId(),
        categoryId: getRandomCategoriesId(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventName: "Polarisasi Musikal",
        date: new Date("2024-05-15"),
        time: "17:00:00",
        registrationDealine: new Date("2024-04-01"),
        type: "offline",
        address : "DKI Jakarta, Jakarta Selatan",
        venueName: "Graha Bhakti Budaya (SHOW 1)",
        status: "active",
        image: "uploads/default2.jpg",
        price: "100000",
        stok: 100,
        description: "Following their successes in music like Epic Rap Battle Prabowo vs. Jokowi 2019, DPR Musical, and PENSI (Pentas Swara Indonesia), Andovi da Lopez and Jovial da Lopez are back with the musical theater Polarisasi LIVE at GBB from February 2-4, 2024. Polarisasi Musical tells the story of five students navigating the challenges of the 2024 elections. All characters in this tale are purely fictional.",
        locationId: getRandomLocationId(),
        categoryId: getRandomCategoriesId(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventName: "POUND X AKSHAYA HOTEL 09 DESEMBER 2023 JAM 07.00",
        date: new Date("2024-05-15"),
        time: "17:00:00",
        registrationDealine: new Date("2024-04-01"),
        type: "hybrid",
        address : "KARAWANG JAWAB BARAT",
        venueName: "AKSHAYA HOTEL KARAWANG",
        status: "active",
        image: "uploads/default3.jpg",
        price: "100000",  
        stok: 100,
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        locationId: getRandomLocationId(),
        categoryId: getRandomCategoriesId(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventName: "NOW YOU HEAR ME",
        date: new Date("2024-05-15"),
        time: "17:00:00",
        registrationDealine: new Date("2024-04-01"),
        type: "offline",
        address : "Bali",
        venueName: "Canna Bali",
        status: "active",
        image: "uploads/default4.jpg",
        price: "100000",
        stok: 100,
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        locationId: getRandomLocationId(),
        categoryId: getRandomCategoriesId(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        eventName: "Park Hyung Sik Fanmeeting in Jakarta",
        date: new Date("2024-05-15"),
        time: "17:00:00",
        registrationDealine: new Date("2024-04-01"),
        type: "online",
        address : "Jalan Pintu Satu Senayan, Rt.1/rw.3, Gelora, Central Jakarta City, Jakarta, Indonesia",
        venueName: "Tennis Indoor Stadium Senayan",
        status: "active",
        image: "uploads/default5.jpg",
        price: "100000",
        stok: 100,
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        locationId: getRandomLocationId(),
        categoryId: getRandomCategoriesId(),
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Events", null, {});
  }
};
