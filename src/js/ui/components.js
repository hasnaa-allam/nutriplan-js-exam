
// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/
//variables
export const productCategories=[
  {name:"Breakfast Cereals",icon:"fa-wheat-awn",from:"#f97316",to:"#ea580c"},
  {name:"Beverages",icon:"fa-bottle-water",from:"#3b82f6",to:"#2563eb"},
  {name:"Snacks",icon:"fa-cookie",from:"#a855f7",to:"#9333ea"},
  {name:"Dairy Products",icon:"fa-cheese",from:"#06b6d4",to:"#0284c7"},
  {name:"Fruits",icon:"fa-apple-whole",from:"#ef4444",to:"#dc2626"},
  {name:"Vegetables",icon:"fa-carrot",from:"#22c55e",to:"#16a34a"},
  {name:"Breads",icon:"fa-bread-slice",from:"#f97316",to:"#c2410c"},
  {name:"Meats",icon:"fa-drumstick-bite",from:"#ef4444",to:"#b91c1c"},
]

const gradeColors={a:"#16a34a",b:"#84cc16",c:"#eab308",d:"#f97316",e:"#ef4444"}
const gradeLabels={a:"Excellent",b:"Good",c:"Average",d:"Poor",e:"Bad"}
const novaColors={1:"#22c55e",2:"#84cc16",3:"#f97316",4:"#ef4444"}
const novaLabels={1:"Unprocessed",2:"Processed ingredients",3:"Processed",4:"Ultra processed"}

const categoryStyles={
  Beef:{icon:"fa-drumstick-bite",color:"#ef4444"},
  Chicken:{icon:"fa-drumstick-bite",color:"#f97316"},
  Dessert:{icon:"fa-cake-candles",color:"#ec4899"},
  Lamb:{icon:"fa-drumstick-bite",color:"#f97316"},
  Miscellaneous:{icon:"fa-bowl-food",color:"#64748b"},
  Pasta:{icon:"fa-bowl-food",color:"#f59e0b"},
  Pork:{icon:"fa-bacon",color:"#ef4444"},
  Seafood:{icon:"fa-fish",color:"#0ea5e9"},
  Side:{icon:"fa-bowl-rice",color:"#22c55e"},
  Starter:{icon:"fa-utensils",color:"#14b8a6"},
  Vegan:{icon:"fa-leaf",color:"#22c55e"},
  Vegetarian:{icon:"fa-seedling",color:"#16a34a"},
  Breakfast:{icon:"fa-bread-slice",color:"#f59e0b"},
  Goat:{icon:"fa-drumstick-bite",color:"#f97316"},
}

//functions
export const getEmptyState= function(){
  return `
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
  </div>
  `
}

export const getLoadingSpinner= function(){
  return `
  <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
  </div>
  `
}

export const getFoodLogEmptyState= function(){
  return `
  <div class="text-center py-8 text-gray-500">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <i class="fa-solid fa-utensils text-2xl text-gray-300"></i>
    </div>
    <p class="font-medium text-gray-700">No food logged today</p>
    <p class="text-sm mb-4">Start tracking your nutrition by logging meals or scanning products</p>
    <div class="flex items-center justify-center gap-3">
      <button id="browse-recipes-btn" class="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-all">
        <i class="fa-solid fa-plus mr-1"></i>Browse Recipes
      </button>
      <button id="scan-product-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-all">
        <i class="fa-solid fa-barcode mr-1"></i>Scan Product
      </button>
    </div>
  </div>
  `
}

export const getLoggedItem= function(item){
  let caloriesHtml="";
  if(item.calories>0){
    caloriesHtml=`
    <div class="text-right">
      <p class="text-sm font-bold text-emerald-600">${item.calories} kcal</p>
    </div>
    `
  }

  return `
  <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
    <img class="w-14 h-14 rounded-lg object-cover" src="${item.thumbnail}" alt="${item.name}" />
    <div class="flex-1">
      <p class="font-semibold text-gray-900 text-sm">${item.name}</p>
      <p class="text-xs text-gray-500">${item.category} - ${item.area} - ${item.time}</p>
    </div>
    ${caloriesHtml}
    <button class="remove-logged-btn text-gray-400 hover:text-red-500 transition-colors" data-id="${item.id}" aria-label="Remove">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
  `
}

export const getProductsEmptyState= function(){
  return `
  <div class="py-16 text-center" style="grid-column: 1 / -1;">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <i class="fa-solid fa-box-open text-2xl text-gray-400"></i>
    </div>
    <p class="text-gray-600 text-lg font-medium">No products to display</p>
    <p class="text-gray-400 text-sm mt-1">Search for a product or browse by category</p>
  </div>
  `
}

export const getProductCategoryButton= function(category){
  return `
  <button class="product-category-btn px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap text-white shadow-md hover:shadow-lg transition-all" data-category="${category.name}" style="background: linear-gradient(135deg, ${category.from}, ${category.to});">
    <i class="fa-solid ${category.icon} mr-1.5"></i>${category.name}
  </button>
  `
}

export const getProductCard= function(product){
  const nutrients=product.nutrients || {};
  const grade=product.nutritionGrade;
  let gradeColor="#9ca3af";
  let gradeText="N/A";
  if(gradeColors[grade]){
    gradeColor=gradeColors[grade];
    gradeText=grade.toUpperCase();
  }

  let imageHtml=`<i class="fa-solid fa-image text-4xl text-gray-300"></i>`;
  if(product.image){
    imageHtml=`<img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" src="${product.image}" alt="${product.name}" loading="lazy" />`;
  }

  let novaHtml="";
  if(product.novaGroup){
    novaHtml=`
    <div class="absolute top-2 right-2 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center" style="background: ${novaColors[product.novaGroup]};" title="NOVA ${product.novaGroup}">${product.novaGroup}</div>
    `
  }

  return `
  <div class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-barcode="${product.barcode}">
    <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
      ${imageHtml}
      <div class="absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded uppercase" style="background: ${gradeColor};">Nutri-Score ${gradeText}</div>
      ${novaHtml}
    </div>
    <div class="p-4">
      <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">${product.brand || "Unknown brand"}</p>
      <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">${product.name}</h3>
      <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
        <span><i class="fa-solid fa-fire mr-1"></i>${Math.round(nutrients.calories || 0)} kcal/100g</span>
      </div>
      <div class="grid grid-cols-4 gap-1 text-center">
        <div class="bg-emerald-50 rounded p-1.5">
          <p class="text-xs font-bold text-emerald-700">${(nutrients.protein || 0).toFixed(1)}g</p>
          <p class="text-[10px] text-gray-500">Protein</p>
        </div>
        <div class="bg-blue-50 rounded p-1.5">
          <p class="text-xs font-bold text-blue-700">${(nutrients.carbs || 0).toFixed(1)}g</p>
          <p class="text-[10px] text-gray-500">Carbs</p>
        </div>
        <div class="bg-purple-50 rounded p-1.5">
          <p class="text-xs font-bold text-purple-700">${(nutrients.fat || 0).toFixed(1)}g</p>
          <p class="text-[10px] text-gray-500">Fat</p>
        </div>
        <div class="bg-orange-50 rounded p-1.5">
          <p class="text-xs font-bold text-orange-700">${(nutrients.sugar || 0).toFixed(1)}g</p>
          <p class="text-[10px] text-gray-500">Sugar</p>
        </div>
      </div>
    </div>
  </div>
  `
}

export const getProductModal= function(product){
  const nutrients=product.nutrients || {};
  const grade=product.nutritionGrade;

  let imageHtml=`<div class="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center"><i class="fa-solid fa-image text-3xl text-gray-300"></i></div>`;
  if(product.image){
    imageHtml=`<img class="w-24 h-24 object-contain rounded-xl" src="${product.image}" alt="${product.name}" />`;
  }

  let gradeHtml="";
  if(gradeColors[grade]){
    gradeHtml=`
    <div class="flex items-center gap-2 px-3 py-2 rounded-lg" style="background: ${gradeColors[grade]}22;">
      <div class="w-8 h-8 rounded text-white font-bold flex items-center justify-center uppercase" style="background: ${gradeColors[grade]};">${grade}</div>
      <div>
        <p class="text-xs font-bold" style="color: ${gradeColors[grade]};">Nutri-Score</p>
        <p class="text-[10px] text-gray-500">${gradeLabels[grade]}</p>
      </div>
    </div>
    `
  }

  let novaHtml="";
  if(product.novaGroup){
    novaHtml=`
    <div class="flex items-center gap-2 px-3 py-2 rounded-lg" style="background: ${novaColors[product.novaGroup]}22;">
      <div class="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center" style="background: ${novaColors[product.novaGroup]};">${product.novaGroup}</div>
      <div>
        <p class="text-xs font-bold" style="color: ${novaColors[product.novaGroup]};">NOVA</p>
        <p class="text-[10px] text-gray-500">${novaLabels[product.novaGroup]}</p>
      </div>
    </div>
    `
  }

  const mainNutrients=[
    {name:"Protein",value:nutrients.protein || 0,color:"#10b981"},
    {name:"Carbs",value:nutrients.carbs || 0,color:"#3b82f6"},
    {name:"Fat",value:nutrients.fat || 0,color:"#a855f7"},
    {name:"Sugar",value:nutrients.sugar || 0,color:"#f97316"},
  ]

  let mainHtml="";
  for(let i=0;i<mainNutrients.length;i++){
    let width=mainNutrients[i].value;
    if(width>100){
      width=100;
    }

    mainHtml+=`
    <div class="text-center">
      <div class="w-full bg-gray-100 rounded-full h-1.5 mb-2">
        <div class="h-1.5 rounded-full" style="width: ${width}%; background: ${mainNutrients[i].color};"></div>
      </div>
      <p class="text-lg font-bold" style="color: ${mainNutrients[i].color};">${mainNutrients[i].value.toFixed(1)}g</p>
      <p class="text-xs text-gray-500">${mainNutrients[i].name}</p>
    </div>
    `
  }

  return `
  <div class="bg-white rounded-2xl shadow-lg p-6 relative" style="width:100%;max-width:600px;max-height:90vh;overflow-y:auto;">
    <button id="close-product-x" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <div class="flex items-center gap-4 mb-5">
      ${imageHtml}
      <div>
        <p class="text-xs text-emerald-600 font-semibold">${product.brand || "Unknown brand"}</p>
        <h2 class="text-xl font-bold text-gray-900 mb-2">${product.name}</h2>
        <div class="flex flex-wrap gap-2">
          ${gradeHtml}
          ${novaHtml}
        </div>
      </div>
    </div>

    <div class="bg-gray-50 rounded-xl p-5 mb-5">
      <h3 class="font-bold text-gray-900 mb-3">
        <i class="fa-solid fa-chart-pie text-emerald-600 mr-1"></i>Nutrition Facts
        <span class="text-sm font-normal text-gray-500">(per 100g)</span>
      </h3>
      <div class="text-center mb-4">
        <p class="text-4xl font-bold text-gray-900">${Math.round(nutrients.calories || 0)}</p>
        <p class="text-sm text-gray-500">Calories</p>
      </div>
      <div class="grid grid-cols-4 gap-3 mb-4">
        ${mainHtml}
      </div>
      <div class="grid grid-cols-3 gap-3 text-center pt-4 border-t border-gray-200">
        <div>
          <p class="font-bold text-gray-900">${(nutrients.saturatedFat || 0).toFixed(1)}g</p>
          <p class="text-xs text-gray-500">Saturated Fat</p>
        </div>
        <div>
          <p class="font-bold text-gray-900">${(nutrients.fiber || 0).toFixed(1)}g</p>
          <p class="text-xs text-gray-500">Fiber</p>
        </div>
        <div>
          <p class="font-bold text-gray-900">${(nutrients.salt || 0).toFixed(2)}g</p>
          <p class="text-xs text-gray-500">Salt</p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button id="log-food-btn" class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all">
        <i class="fa-solid fa-plus"></i>Log This Food
      </button>
      <button id="close-product-btn" class="flex-1 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-all">
        Close
      </button>
    </div>
  </div>
  `
}

export const getCategoryCard= function(category){
  let style={icon:"fa-utensils",color:"#10b981"};
  if(categoryStyles[category.name]){
    style=categoryStyles[category.name];
  }

  return `
  <div class="category-card rounded-xl p-3 border cursor-pointer hover:shadow-md transition-all group" data-category="${category.name}" style="background: ${style.color}14; border-color: ${style.color}55;">
    <div class="flex items-center gap-2.5">
      <div class="text-white w-9 h-9 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm" style="background: ${style.color};">
        <i class="fa-solid ${style.icon}"></i>
      </div>
      <div>
        <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
      </div>
    </div>
  </div>
  `
}

export const getCuisineChip= function(name,isActive){
  let colors="bg-gray-100 text-gray-700 hover:bg-gray-200";
  if(isActive){
    colors="bg-emerald-600 text-white hover:bg-emerald-700";
  }

  return `
  <button class="cuisine-chip px-4 py-2 ${colors} rounded-full font-medium text-sm whitespace-nowrap transition-all" data-area="${name}">${name}</button>
  `
}

export const getMealCard= function(meal){
  let description="Delicious recipe to try!";
  if(meal.instructions && meal.instructions.length>0){
    description=meal.instructions[0];
  }
  const area=meal.area || "Unknown";

  return `
  <div class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group" data-meal-id="${meal.id}">
    <div class="relative h-48 overflow-hidden">
      <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${meal.thumbnail}" alt="${meal.name}" loading="lazy" />
      <div class="absolute bottom-3 left-3 flex gap-2">
        <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">${meal.category}</span>
        <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">${area}</span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">${meal.name}</h3>
      <p class="text-xs text-gray-600 mb-3 line-clamp-2">${description}</p>
      <div class="flex items-center justify-between text-xs">
        <span class="font-semibold text-gray-900"><i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>${meal.category}</span>
        <span class="font-semibold text-gray-500"><i class="fa-solid fa-globe text-blue-500 mr-1"></i>${area}</span>
      </div>
    </div>
  </div>
  `
}

export const getNutritionFacts= function(nutrition){
  const calories=Math.round(nutrition.calories || 0);

  const bars=[
    {name:"Protein",value:nutrition.protein || 0,max:50,color:"#10b981"},
    {name:"Carbs",value:nutrition.carbs || 0,max:300,color:"#3b82f6"},
    {name:"Fat",value:nutrition.fat || 0,max:65,color:"#a855f7"},
    {name:"Fiber",value:nutrition.fiber || 0,max:25,color:"#f97316"},
    {name:"Sugar",value:nutrition.sugar || 0,max:50,color:"#ec4899"},
    {name:"Saturated Fat",value:nutrition.saturatedFat || 0,max:20,color:"#ef4444"},
  ]

  let barsHtml="";
  for(let i=0;i<bars.length;i++){
    let width=bars[i].value/bars[i].max*100;
    if(width>100){
      width=100;
    }

    barsHtml+=`
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full" style="background: ${bars[i].color};"></div>
        <span class="text-gray-700">${bars[i].name}</span>
      </div>
      <span class="font-bold text-gray-900">${Math.round(bars[i].value)}g</span>
    </div>
    <div class="w-full bg-gray-100 rounded-full h-2">
      <div class="h-2 rounded-full" style="width: ${width}%; background: ${bars[i].color};"></div>
    </div>
    `
  }

  return `
  <p class="text-sm text-gray-500 mb-4">Per serving</p>

  <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
    <p class="text-sm text-gray-600">Calories per serving</p>
    <p class="text-4xl font-bold text-emerald-600">${calories}</p>
    <p class="text-xs text-gray-500 mt-1">Total: ${calories*4} cal</p>
  </div>

  <div class="space-y-4">
    ${barsHtml}
  </div>

  <div class="mt-6 pt-6 border-t border-gray-100">
    <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
    <div class="grid grid-cols-2 gap-3 text-sm">
      <div class="flex justify-between">
        <span class="text-gray-600">Cholesterol</span>
        <span class="font-medium">${Math.round(nutrition.cholesterol || 0)}mg</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-600">Sodium</span>
        <span class="font-medium">${Math.round(nutrition.sodium || 0)}mg</span>
      </div>
    </div>
  </div>
  `
}

export const getMealDetails= function(meal){
  const area=meal.area || "Unknown";
  const ingredients=meal.ingredients || [];
  const instructions=meal.instructions || [];
  const tags=meal.tags || [];

  let tagsHtml="";
  for(let i=0;i<tags.length;i++){
    tagsHtml+=`<span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">${tags[i]}</span>`;
  }

  let ingredientsHtml="";
  for(let i=0;i<ingredients.length;i++){
    ingredientsHtml+=`
    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
      <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
      <span class="text-gray-700"><span class="font-medium text-gray-900">${ingredients[i].measure}</span> ${ingredients[i].ingredient}</span>
    </div>
    `
  }

  let instructionsHtml="";
  for(let i=0;i<instructions.length;i++){
    instructionsHtml+=`
    <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
      <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">${i+1}</div>
      <p class="text-gray-700 leading-relaxed pt-2">${instructions[i]}</p>
    </div>
    `
  }

  let videoHtml="";
  if(meal.youtube){
    const videoId=meal.youtube.split("v=")[1];
    videoHtml=`
    <div class="bg-white rounded-2xl shadow-lg p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <i class="fa-solid fa-video text-red-500"></i>
        Video Tutorial
      </h2>
      <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
        <iframe src="https://www.youtube.com/embed/${videoId}" class="absolute inset-0 w-full h-full" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    `
  }

  let sourceHtml="";
  if(meal.source){
    sourceHtml=`
    <div class="mt-6 pt-6 border-t border-gray-100">
      <h3 class="text-sm font-semibold text-gray-900 mb-2">Recipe Source</h3>
      <a href="${meal.source}" target="_blank" class="text-sm text-emerald-600 hover:text-emerald-700">
        <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i>View Original Recipe
      </a>
    </div>
    `
  }

  return `
  <div class="max-w-7xl mx-auto">
    <button id="back-to-meals-btn" class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
      <i class="fa-solid fa-arrow-left"></i>
      <span>Back to Recipes</span>
    </button>

    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
      <div class="relative h-80 md:h-96">
        <img src="${meal.thumbnail}" alt="${meal.name}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${meal.category}</span>
            <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${area}</span>
            ${tagsHtml}
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${meal.name}</h1>
          <div class="flex items-center gap-6 text-white/90">
            <span class="flex items-center gap-2"><i class="fa-solid fa-clock"></i><span>30 min</span></span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-utensils"></i><span>4 servings</span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-3 mb-8">
      <button id="log-meal-btn" class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all" data-meal-id="${meal.id}">
        <i class="fa-solid fa-clipboard-list"></i>
        <span>Log This Meal</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-list-check text-emerald-600"></i>
            Ingredients
            <span class="text-sm font-normal text-gray-500 ml-auto">${ingredients.length} items</span>
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            ${ingredientsHtml}
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
            Instructions
          </h2>
          <div class="space-y-4">
            ${instructionsHtml}
          </div>
        </div>

        ${videoHtml}
      </div>

      <div class="space-y-6">
        <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-emerald-600"></i>
            Nutrition Facts
          </h2>
          <div id="nutrition-facts-container">
            ${getLoadingSpinner()}
          </div>
          ${sourceHtml}
        </div>
      </div>
    </div>
  </div>
  `
}