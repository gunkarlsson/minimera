import styled from "styled-components";

//---------------------------------- SECTIONS --------------------------------
export const PrimarySection = styled.section`
  height: 92vh;
  width: 100%;
  top: 0;
  background-color: ${(props) => props.theme.bgColor2};
  color: ${(props) => props.theme.fontColor1};
  position: absolute;
`;

export const SecondarySection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor2};
  color: ${(props) => props.theme.fontColor1};
`;

//----------------------------------- TEXT ELEMENTS ----------------------------------
export const PrimaryH1 = styled.h1`
  text-align: center;
  margin-top: 80px;
  font-family: "Amiri";
  font-size: 2.2rem;
`;

export const SecondaryH1 = styled.h1`
  text-align: center;
  margin-top: 30px;
  font-family: "Amiri";
  font-size: 2.2rem;
`;

export const PrimaryLink = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: 1.3rem;
  font-weight: 500;
  margin: 15px 0;
  width: 80vw;
  display: block;

  a {
    color: ${(props) => props.theme.fontColor1};
    border-bottom: 2px solid ${(props) => props.theme.fontColor1};
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    padding-bottom: 5px;
  }
`;

//----------------------------------- FORMS ----------------------------------
export const FormSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 30px 0;

  .form-control {
    position: relative;
    margin: 20px 0;
    width: 100%;
  }

  .form-control input {
    background: none;
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.fontColor1};
    display: block;
    width: 100%;
    padding: 10px 0;
    font-size: 1.5rem;
    outline: none;
  }
  .form-control input:focus,
  .form-control input:valid {
    outline: none;
  }

  .form-control label {
    position: absolute;
    top: 15px;
    left: 0;
    color: ${(props) => props.theme.fontColor2};
  }

  .form-control label span {
    display: inline-block;
    font-size: 1.2rem;
    min-width: 5px;
    transition: 0.3s cubic-bezier(0.65, 0.01, 0.35, 1);
  }
  .form-control input:focus + label span,
  .form-control input:valid + label span {
    transform: translateY(-35px);
  }
`;

//----------------------------------- BOOK GRID ----------------------------------
export const ResultGrid = styled.section`
  padding: 0 20px;
  max-height: 80vh;
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  /* grid-gap: 0.5rem; */
  overflow: scroll;
`;

export const ItemCard = styled.section`
  background-color: beige;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  width: 180px;

  .image-bg {
    background-color: ${(props) => props.theme.bgColor1};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
    width: 160px;
    box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
  }

  img {
    height: 65%;
    max-width: 70%;
    background-color: ${(props) => props.theme.bgColor2};
    box-shadow: -4px 4px 6px rgba(0, 0, 0, 0.2);
  }

  .text-div {
    margin: 10px 0 20px 10px;
    text-align: left;
    width: 95%;
  }

  span {
    font-weight: 400;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: ${(props) => props.theme.fontColor2};
  }

  h2 {
    font-weight: 600;
    font-size: 1.1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* text-overflow: ellipsis; */
    overflow: hidden;
    color: ${(props) => props.theme.fontColor1};
  }
`;

//----------------------------------- BUTTONS ----------------------------------
export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.fontColor1};
  margin-left: 30px;
  margin-top: 30px;
`;

export const PrimaryButton = styled.button`
  background: none;
  border: 2px solid ${(props) => props.theme.fontColor1};
  color: ${(props) => props.theme.fontColor1};
  font-size: 1.2rem;
  width: 80%;
  margin-top: 50px;
  padding: 10px;
`;

export const SubmitButton = styled.button`
  background: none;
  border: 2px solid ${(props) => props.theme.fontColor1};
  color: ${(props) => props.theme.fontColor1};
  font-size: 1.2rem;
  width: 100%;
  margin-top: 50px;
  padding: 10px;
`;
