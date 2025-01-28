<template>
  <q-page>
    <h1 class="title">Popularno</h1>

    <p class="description">Ovo su najpopularniji planovi prehrane među našim korisnicima. Pokazali su najbolje rezultate i zadovoljstvo
      naših klijenata.
    </p>

    <div class="image-container">
      <div v-for="(plan, index) in mealPlans" :key="index" class="meal-card">
        <img :src="plan.image" :alt="plan.title" class="meal-image" />
        <h2 class="meal-title">{{ plan.title }}</h2>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});

const mealPlans = [
  {
    title: "Keto Meal Plan",
    image:
      "https://www.ketodietyum.com/wp-content/uploads/2019/03/19-Day-Keto-Diet-Meal-Plan-2023-01.jpg",
  },
  {
    title: "Mediterranean Meal Plan",
    image:
      "https://yummywholefoodrecipes.com/wp-content/uploads/2023/06/7-Day-Mediterranean-Dieat-Meal-Plan.png",
  },
  {
    title: "Plant-based diet",
    image: "https://m.media-amazon.com/images/I/81dG5OK1QzL.jpg",
  },
  {
    title: "Paleo Meal Plan",
    image:
      "https://nutriadmin.com/blog/wp-content/uploads/2024/05/paleo-food-list-683x1024.png",
  },
  {
    title: "Vegan Meal Plan",
    image:
      "https://i.pinimg.com/736x/0d/c4/c5/0dc4c5e830c9cb1247b95e2f525d7c95.jpg",
  },
];
</script>

<style scoped>
.title {
  margin-top: 20px; /* prostor iznad naslova popularno */
  margin-left: 20px; /* prostor s ljeva */
  font-size: 24px;
  font-weight: bold;
  font-family: "Century Gothic", Arial, sans-serif;
  user-select: none;
}

.description {
  margin-top: 20px; /* prostor iznad naslova popularno */
  margin-left: 20px; /* prostor s ljeva */
  margin-right: 500px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Century Gothic", Arial, sans-serif;
  user-select: none;
}

.image-container {
  display: flex; /* flexbox= slike u redu */
  margin-top: 10px; /* prostor ispod naslova popularno */
  overflow-x: auto; /* horizontalno skrolanje */
  padding: 10px;
  padding-left: 50px;
}

.meal-image {
  width: 200px; /* minimalna sirina za slike */
  margin-top: 30px;
  margin-right: 30px; /* prostor izmedu slika */
  height: auto; /* original slika */
  border: 7px solid #4caf50;
  border-radius: 10px;
  padding: 5px;
}
.meal-title {
  margin-top: 1px; /* prostor iznad naslova */
  font-size: 15px;
  text-align: center;
  font-family: "Century Gothic", Arial, sans-serif;
  font-weight: bold;
  margin-left: -27px;
  user-select: none;
}
</style>
