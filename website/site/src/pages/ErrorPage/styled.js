import styled from "styled-components";

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   
   height: 100vh;
   background-color: #2b3031;

   .box {
       display: flex;
       flex-direction: row;

       justify-content: center;
       align-items: center;
       margin-bottom: 10em;
     }

   h1 {
       font-family: 'Roboto';
       font-size: 3em;
       color: white;
     
      
   }

   .error-text {
       display: flex;
       flex-direction: row;
       width: 100%;
       text-align: center;
       justify-content: center;

       

       
       color: white;
   }

   .error-text h1, h2 {
       margin: 0px;
   }

   .error-text h1 {
       color: #10EAEA;
       font-size: 6em;
   }

   .error-text h2 {
       font-size: 3em;
       margin-top: .4em;
       margin-left: .5em;
   }

   h1 span {
       color: #10EAEA;
   }

   a {
       color: white;
       text-decoration: none;
       font-family: 'Roboto';
       font-size: .5em;
   }

   
`

export { Container };