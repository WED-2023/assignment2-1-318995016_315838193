<template>
    <div class="container mt-5">
    <h1 class="title"> About us </h1>
      <div class="row mb-4">
        <!-- Developers Card -->
        <div class="col-md-6 d-flex flex-column">
          <b-card header="Developers" header-tag="header" class="developerCard" header-class="titleheader">
            <b-card-text class="noam">
              <b>Noam Barak</b>
              <p>
                3rd-year student in Software Information Engineering at Ben Gurion University in Beer-Sheva, Israel.
              </p>
              <p>
                <b>Experience:</b> Backend development in Python, Java, C#, and SQL. Loves to create and develop new applications, and has a lot of ideas for innovation.
              </p>
              <hr>
              <b>Linoy Bitan</b>
              <p>
                3rd-year student in Software Information Engineering at Ben Gurion University in Beer-Sheva, Israel.
              </p>
              <p>
                <b>Experience:</b> Backend development in Python, Java, C#, and JavaScript. Works hard to achieve the best results and enjoys tackling challenges.
              </p>
            </b-card-text>
          </b-card>
        </div>
        
        <!-- Project Overview Card -->
        <div class="col-md-6 d-flex flex-column">
          <b-card header="Project Overview" header-tag="header" class="Overview" header-class="titleheader">
            <b-card-text>
              Our goal was to create a website that serves as a platform for users to access various recipes. Users can upload their own recipes, save their favorite recipes from others, and create family recipe pages. Essentially, the platform allows different users to aggregate all the recipes they desire, benefit from recipes shared by others, and share their own personal recipes.
              <br><br>
              Additionally, we integrated backend and frontend work, emphasizing security and proper data storage to enable users to make the best use of the site.
              <br><br>
              <b>Technologies Used:</b>
              <ul>
                <li>Frontend: Vue.js, Bootstrap-Vue, SCSS</li>
                <li>Backend: Node.js, Express, MySQL</li>
                <li>Other: Axios for API calls, Bootstrap for responsive design, Git for version control</li>
              </ul>
            </b-card-text>
          </b-card>
        </div>
      </div>
    
      <div class="row justify-content-center">
        <!-- Previous Projects and Contact Us Cards in one column -->
        <div class="col-md-12">
          <!-- Previous Projects Card -->
          <b-card header="Previous Projects" header-tag="header" class="previousCard" header-class="titleheader">
            <b-card-text>
              <div class="row">
                <div class="col-md-4 mb-3 text-center">
                  <div class="circle-container bigger-circle">
                    <img src="@/assets/images/linoy.jpg" alt="Linoy Projects" class="project-thumbnail-linoy mb-2">
                  </div>
                  <br>
                  <a href="https://github.com/WED-2023/318995016" target="_blank">Linoy Project</a>
                </div>
                <div class="col-md-4 mb-3 text-center">
                  <div class="circle-container bigger-circle">
                    <img src="@/assets/images/together.jpg" alt=" Our Projects" class="project-thumbnail-together mb-2">
                  </div>
                  <br>
                  <a href="https://github.com/LinoyBitan/Transport-and-HR-system" target="_blank">Our Project</a>
                </div>
                <div class="col-md-4 mb-3 text-center">
                  <div class="circle-container bigger-circle">
                    <img src="@/assets/images/noam.jpg" alt="Noam Projects" class="project-thumbnail-noam mb-2">
                  </div>
                  <br>
                  <a href="https://github.com/WED-2023/315838193" target="_blank">Noam Project</a>
                </div>
              </div>
            </b-card-text>
          </b-card>
          
          <!-- Contact Us Card -->
          <b-card header="Contact Us" header-tag="header" class="contactCard" header-class="titleheader">
            <b-card-text class="text-center">
              <ul class="contact-list">
                <li class="mb-3">
                  <i class="fas fa-envelope" style="color: black;"></i>
                  <a href="mailto:noam6446@gmail.com">Noam Barak</a>
                </li>
                <li>
                  <i class="fas fa-envelope" style="color: black;"></i>
                  <a href="mailto:linoyb0523@gmail.com">Linoy Bitan</a>
                </li>
              </ul>
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutPage"
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css?family=Concert+One:400,700&display=swap");
  
  
  
  

  .noam, .Overview{
    font-size: 15px;
  }

  .container {
    font-size: 18px;
    color: black;
    max-width: 1000px;
    margin-top: 50px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 2px solid #ddd;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
  }
  
  .title {
    font-family: 'Pacifico', cursive;
    font-size: 4em;
    margin-bottom: 20px;
    color: black;
    text-align: center;
  }
  
  
  .card-header {
    font-size: 1.7rem;
    font-weight: bold;
  }
  
  .previousCard{
    height: 310px;
  }

  .contactCard{
    height: 130px;
  }
  .developerCard, .Overview{
    height: 490px;
  }

  .titleheader , .previousCard, .developerCard, .Overview, .contactCard{
    margin-bottom: 0.25rem !important;
    border-radius: 10px;

  }
  .titleheader {
  color: white; /* Set the text color to brown */
  background-color: rgb(165, 107, 57);
  }
  
  .b-card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  a {
    text-decoration: none;
    color: black;
    text-decoration: underline;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .contact-list {
    list-style: none;
    padding: 0;
    
  }
  
  .contact-list li {
    display: inline-block;
    margin-right: 20px;
    
  }
  
  .contact-list i {
    margin-right: 10px;
    color: #007bff;
    
  }
  
  .circle-container {
    width: 180px; 
    height: 180px; 
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%; /* Make circular */
    margin: auto;

  }
  
  .project-thumbnail-together {
    width: 100%; 
    height: auto; 
    transform: translateY(20%); /* Adjust vertical position */
  }
  
  .project-thumbnail-noam,
  .project-thumbnail-linoy {
    width: 100%; 
    height: auto; /* Maintain aspect ratio */
    
  }
  
  .bigger-circle {
    width: 150px; 
    height: 150px; 
  }
  
  </style>
  