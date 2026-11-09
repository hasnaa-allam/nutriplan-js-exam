/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
/**
 * NutriPlan - Main Entry Point
 */
import {
  getEmptyState,
  getLoadingSpinner,
  getFoodLogEmptyState,
  getLoggedItem,
  getProductsEmptyState,
  getProductCard,
  getProductModal,
  productCategories,
  getProductCategoryButton,
  getMealCard,
  getMealDetails,
  getNutritionFacts,
  getCategoryCard,
  getCuisineChip,
} from "./ui/components.js";

//Dom selection
const loadingOverlay=document.getElementById("app-loading-overlay");
const mealsContainer=document.getElementById("recipes-grid");
const recipesCountText=document.getElementById("recipes-count");
const categoriesContainer=document.getElementById("categories-grid");
const cuisinesContainer=document.querySelector("#search-filters-section .overflow-x-auto");
const searchInput=document.getElementById("search-input");
const mealDetailsSection=document.getElementById("meal-details");
const loggedItemsList=document.getElementById("logged-items-list");
const loggedCountText=document.querySelector("#foodlog-today-section h4");
const clearFoodLogBtn=document.getElementById("clear-foodlog");
const foodLogDate=document.getElementById("foodlog-date");
const productCategoriesContainer=document.getElementById("product-categories");
const productsGrid=document.getElementById("products-grid");
const productsCountText=document.getElementById("products-count");
const productSearchInput=document.getElementById("product-search-input");
const searchProductBtn=document.getElementById("search-product-btn");
const gradeButtons=document.querySelectorAll(".nutri-score-filter");
const allGradeBtn=document.querySelector('.nutri-score-filter[data-grade=""]');
const gridViewBtn=document.getElementById("grid-view-btn");
const listViewBtn=document.getElementById("list-view-btn");
const navLinks=document.querySelectorAll(".nav-link");
const headerTitle=document.querySelector("#header h1");
const headerSubtitle=document.querySelector("#header p");

//variables
const baseUrl="https://nutriplan-api.vercel.app/api";
const apiKey="YOUR_USDA_API_KEY";
let mealsArray=[];
let categoriesArray=[];
let areasArray=[];
let productsArray=[];
let loggedItems=[];
let searchTimer;
let lastProductQuery="";
let selectedGrade="";

const pageNames=["meals","products","foodlog"];
const allSectionIds=["search-filters-section","meal-categories-section","all-recipes-section","meal-details","products-section","foodlog-section"];
const pages={
  meals:{
    title:"Meals & Recipes",
    subtitle:"Discover delicious and nutritious recipes tailored for you",
    sections:["search-filters-section","meal-categories-section","all-recipes-section"]
  },
  products:{
    title:"Product Scanner",
    subtitle:"Search packaged foods by name or barcode",
    sections:["products-section"]
  },
  foodlog:{
    title:"Food Log",
    subtitle:"Track your daily nutrition and food intake",
    sections:["foodlog-section"]
  }
}

//functions
const toggleLoader= function(isOpen){
  if(isOpen){
    loadingOverlay.style.display="flex";
  }
  else{
    loadingOverlay.style.display="none";
  }
}

const getAllMeals= async function(searchQuery){
  try {
    const response= await fetch(`${baseUrl}/meals/search?q=${encodeURIComponent(searchQuery)}&page=1&limit=25`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    mealsArray=payload.results;
  } catch (error) {
    console.log(error)
    mealsArray=[];
  }
}

const getMealsByCategory= async function(category){
  try {
    const response= await fetch(`${baseUrl}/meals/filter?category=${category}&page=1&limit=25`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    mealsArray=payload.results;
    for(let i=0;i<mealsArray.length;i++){
      mealsArray[i].category=category;
    }
  } catch (error) {
    console.log(error)
    mealsArray=[];
  }
}

const getFullMeal= async function(meal){
  try {
    const response= await fetch(`${baseUrl}/meals/search?q=${encodeURIComponent(meal.name)}&page=1&limit=25`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    for(let i=0;i<payload.results.length;i++){
      if(payload.results[i].id==meal.id){
        return payload.results[i];
      }
    }
    return meal;
  } catch (error) {
    console.log(error)
    return meal;
  }
}

const getCategories= async function(){
  try {
    const response= await fetch(`${baseUrl}/meals/categories`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    categoriesArray=payload.results;
  } catch (error) {
    console.log(error)
    categoriesArray=[];
  }
}

const getAreas= async function(){
  try {
    const response= await fetch(`${baseUrl}/meals/areas`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    areasArray=payload.results;
  } catch (error) {
    console.log(error)
    areasArray=[];
  }
}

const getProducts= async function(query){
  try {
    const response= await fetch(`${baseUrl}/products/search?q=${encodeURIComponent(query)}&page=1&limit=24`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    productsArray=payload.results;
  } catch (error) {
    console.log(error)
    productsArray=[];
  }
}

const getNutrition= async function(meal){
  const nutritionContainer=document.getElementById("nutrition-facts-container");

  try {
    let ingredientsList=[];
    for(let i=0;i<meal.ingredients.length;i++){
      ingredientsList.push(`${meal.ingredients[i].measure} ${meal.ingredients[i].ingredient}`);
    }

    const response= await fetch(`${baseUrl}/nutrition/analyze`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        'x-api-key':apiKey
      },
      body:JSON.stringify({
        recipeName:meal.name,
        ingredients:ingredientsList
      })
    })
    if(!response.ok){
      throw new Error(`Error ${response.status}`)
    }
    const payload=await response.json();
    console.log(payload)

    nutritionContainer.innerHTML=getNutritionFacts(payload.result.perServing);
  } catch (error) {
    console.log(error)
    nutritionContainer.innerHTML=`<p class="text-sm text-gray-500">Nutrition information is not available right now.</p>`;
  }
}

const getTodayKey= function(){
  return new Date().toLocaleDateString("en-CA");
}

const loadFoodLog= function(){
  const saved=localStorage.getItem("nutriplan-foodlog");
  if(saved){
    loggedItems=JSON.parse(saved);
  }
}

const saveFoodLog= function(){
  localStorage.setItem("nutriplan-foodlog",JSON.stringify(loggedItems));
}

const logFood= function(product){
  const nutrients=product.nutrients || {};
  const now=new Date();

  loggedItems.push({
    id:Date.now(),
    name:product.name,
    thumbnail:product.image,
    category:product.brand || "Unknown brand",
    area:"100g",
    date:getTodayKey(),
    time:now.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),
    calories:Math.round(nutrients.calories || 0),
    protein:nutrients.protein || 0,
    carbs:nutrients.carbs || 0,
    fat:nutrients.fat || 0
  })
  saveFoodLog();
  displayFoodLog();
}

const removeLoggedItem= function(itemId){
  let remaining=[];
  for(let i=0;i<loggedItems.length;i++){
    if(loggedItems[i].id!=itemId){
      remaining.push(loggedItems[i]);
    }
  }
  loggedItems=remaining;
  saveFoodLog();
  displayFoodLog();
}

const closeProductModal= function(){
  const modal=document.getElementById("product-modal");
  if(modal){
    modal.remove();
  }
}

const openProductModal= function(product){
  const modal=document.createElement("div");
  modal.id="product-modal";
  modal.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:16px;z-index:100";
  modal.innerHTML=getProductModal(product);
  document.body.appendChild(modal);

  modal.addEventListener("click",function(e){
    if(e.target==modal){
      closeProductModal();
    }
  })
  document.getElementById("close-product-x").addEventListener("click",closeProductModal);
  document.getElementById("close-product-btn").addEventListener("click",closeProductModal);
  document.getElementById("log-food-btn").addEventListener("click",function(){
    logFood(product);
    this.innerText="Added!";
    setTimeout(closeProductModal,700);
  })
}

const displayMeals= function(){
  if(mealsArray.length==0){
    mealsContainer.innerHTML=getEmptyState();
  }
  else{
    let data="";
    for(let i=0;i<mealsArray.length;i++){
      data+=getMealCard(mealsArray[i]);
    }
    mealsContainer.innerHTML=data;
  }
  recipesCountText.innerText=`Showing ${mealsArray.length} recipes`;
  connectMealCards();
}

const displayCategories= function(){
  let data="";
  for(let i=0;i<categoriesArray.length && i<12;i++){
    data+=getCategoryCard(categoriesArray[i]);
  }
  categoriesContainer.innerHTML=data;
}

const displayAreas= function(){
  let data=getCuisineChip("All Cuisines",true);
  for(let i=0;i<areasArray.length && i<10;i++){
    data+=getCuisineChip(areasArray[i].name,false);
  }
  cuisinesContainer.innerHTML=data;
}

const displayFoodLog= function(){
  let todayItems=[];
  for(let i=0;i<loggedItems.length;i++){
    if(loggedItems[i].date==getTodayKey()){
      todayItems.push(loggedItems[i]);
    }
  }

  loggedCountText.innerText=`Logged Items (${todayItems.length})`;

  if(todayItems.length==0){
    loggedItemsList.innerHTML=getFoodLogEmptyState();
    clearFoodLogBtn.style.display="none";

    document.getElementById("browse-recipes-btn").addEventListener("click",function(){
      goToPage("meals");
    })
    document.getElementById("scan-product-btn").addEventListener("click",function(){
      goToPage("products");
    })
  }
  else{
    let data="";
    for(let i=0;i<todayItems.length;i++){
      data+=getLoggedItem(todayItems[i]);
    }
    loggedItemsList.innerHTML=data;
    clearFoodLogBtn.style.display="";

    const removeButtons=document.querySelectorAll(".remove-logged-btn");
    for(let i=0;i<removeButtons.length;i++){
      removeButtons[i].addEventListener("click",function(){
        removeLoggedItem(this.dataset.id);
      })
    }
  }
}

const setupFoodLog= function(){
  foodLogDate.innerText=new Date().toLocaleDateString("en-US",{
    weekday:"long",
    month:"short",
    day:"numeric"
  });

  clearFoodLogBtn.addEventListener("click",function(){
    let remaining=[];
    for(let i=0;i<loggedItems.length;i++){
      if(loggedItems[i].date!=getTodayKey()){
        remaining.push(loggedItems[i]);
      }
    }
    loggedItems=remaining;
    saveFoodLog();
    displayFoodLog();
  })
}

const displayProductCategories= function(){
  let data="";
  for(let i=0;i<productCategories.length;i++){
    data+=getProductCategoryButton(productCategories[i]);
  }
  productCategoriesContainer.innerHTML=data;
}

const displayProducts= function(){
  let visibleProducts=[];
  for(let i=0;i<productsArray.length;i++){
    if(selectedGrade=="" || productsArray[i].nutritionGrade==selectedGrade){
      visibleProducts.push(productsArray[i]);
    }
  }

  if(visibleProducts.length==0){
    productsGrid.innerHTML=getProductsEmptyState();
    if(lastProductQuery==""){
      productsCountText.innerText="Search for products to see results";
    }
    else{
      productsCountText.innerText=`No products found for "${lastProductQuery}"`;
    }
  }
  else{
    let data="";
    for(let i=0;i<visibleProducts.length;i++){
      data+=getProductCard(visibleProducts[i]);
    }
    productsGrid.innerHTML=data;
    productsCountText.innerText=`Found ${visibleProducts.length} products for "${lastProductQuery}"`;
    connectProductCards();
  }
}

const searchProducts= async function(){
  const query=productSearchInput.value.trim();
  if(query==""){
    return;
  }
  lastProductQuery=query;
  productsGrid.innerHTML=`<div style="grid-column: 1 / -1;">${getLoadingSpinner()}</div>`;
  await getProducts(query);
  displayProducts();
}

const setupProductSearch= function(){
  allGradeBtn.classList.remove("bg-emerald-600","text-white");
  allGradeBtn.classList.add("bg-gray-100","text-gray-700");

  searchProductBtn.addEventListener("click",searchProducts);
  productSearchInput.addEventListener("keydown",function(e){
    if(e.key=="Enter"){
      searchProducts();
    }
  })

  for(let i=0;i<gradeButtons.length;i++){
    gradeButtons[i].addEventListener("click",function(){
      selectedGrade=this.dataset.grade;
      for(let j=0;j<gradeButtons.length;j++){
        gradeButtons[j].style.boxShadow="none";
      }
      if(selectedGrade!=""){
        this.style.boxShadow="0 0 0 2px currentColor";
      }
      displayProducts();
    })
  }
}

const connectProductCards= function(){
  const productCards=document.querySelectorAll(".product-card");
  for(let i=0;i<productCards.length;i++){
    productCards[i].addEventListener("click",function(){
      for(let j=0;j<productsArray.length;j++){
        if(productsArray[j].barcode==this.dataset.barcode){
          openProductModal(productsArray[j]);
        }
      }
    })
  }
}

const connectCategoryCards= function(){
  const categoryCards=document.querySelectorAll(".category-card");
  for(let i=0;i<categoryCards.length;i++){
    categoryCards[i].addEventListener("click",async function(){
      searchInput.value="";
      mealsContainer.innerHTML=getLoadingSpinner();
      await getMealsByCategory(this.dataset.category);
      displayMeals();
    })
  }
}

const connectMealCards= function(){
  const mealCards=document.querySelectorAll(".recipe-card");
  for(let i=0;i<mealCards.length;i++){
    mealCards[i].addEventListener("click",function(){
      openMealDetails(this.dataset.mealId);
    })
  }
}

const setupSearch= function(){
  searchInput.addEventListener("input",function(){
    clearTimeout(searchTimer);
    const query=this.value.trim();
    searchTimer=setTimeout(async function(){
      mealsContainer.innerHTML=getLoadingSpinner();
      if(query==""){
        await getAllMeals("chicken");
      }
      else{
        await getAllMeals(query);
      }
      displayMeals();
    },500)
  })
}

const openMealDetails= async function(mealId){
  let meal;
  for(let i=0;i<mealsArray.length;i++){
    if(mealsArray[i].id==mealId){
      meal=mealsArray[i];
    }
  }
  if(!meal){
    return;
  }

  for(let i=0;i<allSectionIds.length;i++){
    document.getElementById(allSectionIds[i]).style.display="none";
  }
  mealDetailsSection.style.display="";
  mealDetailsSection.innerHTML=getLoadingSpinner();
  window.scrollTo(0,0);

  if(!meal.ingredients){
    meal=await getFullMeal(meal);
  }
  mealDetailsSection.innerHTML=getMealDetails(meal);

  document.getElementById("back-to-meals-btn").addEventListener("click",function(){
    showPage("meals");
  })

  getNutrition(meal);
}

const setView= function(viewName){
  const gridIcon=gridViewBtn.querySelector("i");
  const listIcon=listViewBtn.querySelector("i");

  if(viewName=="grid"){
    mealsContainer.className="grid grid-cols-4 gap-5";
    gridViewBtn.className="px-3 py-1.5 bg-white rounded-md shadow-sm";
    listViewBtn.className="px-3 py-1.5";
    gridIcon.className="fa-solid fa-table-cells text-gray-700";
    listIcon.className="fa-solid fa-list text-gray-500";
  }
  else{
    mealsContainer.className="grid grid-cols-2 gap-5";
    listViewBtn.className="px-3 py-1.5 bg-white rounded-md shadow-sm";
    gridViewBtn.className="px-3 py-1.5";
    listIcon.className="fa-solid fa-list text-gray-700";
    gridIcon.className="fa-solid fa-table-cells text-gray-500";
  }
}

const showPage= function(pageName){
  for(let i=0;i<allSectionIds.length;i++){
    document.getElementById(allSectionIds[i]).style.display="none";
  }
  const page=pages[pageName];
  for(let i=0;i<page.sections.length;i++){
    document.getElementById(page.sections[i]).style.display="";
  }
  headerTitle.innerText=page.title;
  headerSubtitle.innerText=page.subtitle;
}

const setActiveLink= function(activeIndex){
  for(let i=0;i<navLinks.length;i++){
    const linkText=navLinks[i].querySelector("span");
    if(i==activeIndex){
      navLinks[i].className="nav-link flex items-center gap-3 px-3 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg transition-all";
      linkText.className="font-semibold";
    }
    else{
      navLinks[i].className="nav-link flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-all";
      linkText.className="font-medium";
    }
  }
}

const goToPage= function(pageName){
  showPage(pageName);
  setActiveLink(pageNames.indexOf(pageName));
  window.scrollTo(0,0);
}

const setupNavigation= function(){
  for(let i=0;i<navLinks.length;i++){
    navLinks[i].addEventListener("click",function(e){
      e.preventDefault();
      goToPage(pageNames[i]);
    })
  }
  gridViewBtn.addEventListener("click",function(){
    setView("grid");
  })
  listViewBtn.addEventListener("click",function(){
    setView("list");
  })
}

const init= async function(){
  try {
    loadFoodLog();
    setupNavigation();
    setupSearch();
    setupProductSearch();
    setupFoodLog();
    showPage("meals");

    await getAllMeals("chicken");
    await getCategories();
    await getAreas();

    displayMeals();
    displayCategories();
    displayAreas();
    displayFoodLog();
    displayProductCategories();
    displayProducts();
    connectCategoryCards();
  } catch (error) {
    console.log(error)
  }
  finally{
    toggleLoader(false);
  }
}

init();