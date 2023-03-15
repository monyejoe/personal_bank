import Circle from "../components/Circle";
import style from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <>
    <div class="container">
      <div> </div>
  <div class="row" style={{paddinTop:"40px", marginTop:"40px"}}>
    <div class="col-8">
 
    <div className={style.container}>
        <Circle backgroundColor="green" left="-40vh" top="-20vh" className={style.circle}/>
        <Circle backgroundColor="yellow" right="-30vh" bottom="-60vh" className={style.circle}/>
      <h1 className={style.title}>Get in Touch</h1>
      <form className={style.form}>
        <input className={style.inputS} type="text" placeholder="Name" />
        <input className={style.inputS} type="text" placeholder="Phone" />
        <input className={style.inputL} type="text" placeholder="Email" />
        <input className={style.inputL} type="text" placeholder="Subject" />
        <textarea
          className={style.textArea}
          type="text"
          rows={6}
          placeholder="Message"
        />
        <button className={style.button}>SUBMIT</button>
      </form>
    </div>
    </div>
    <div class="col-4">
    <h2 className={style.title}>Or you can send us mail on</h2><br/> <br/>
    <p className={style.title2}>support@anchor-offshore.com</p>
    </div>
    </div>
    </div>
    </>
  );
};

export default Contact;
