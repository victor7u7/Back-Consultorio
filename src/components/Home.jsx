import "../styles/Css.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import img1 from "../media/img1.jpg";
import img2 from "../media/img2.jpg";
import img3 from "../media/img3.jpg";
import img4 from "../media/img4.jpg";
import img5 from "../media/img5.jpg";
import img6 from "../media/img6.jpg";
import Form from "./Form";
import { useState } from "react";
import bg from "../media/consul.jpg";
import NavBar from "./NavBar";
const swiperImages = [img1, img2, img3, img4, img5, img6];
const Home = () => {
  return (
    <>
      <main id="inicio" className="">
        <div
          className="h-2/5  sm:h-screen bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(4, 4, 4, 0.696), rgba(12, 12, 12, 0.77)), url(${bg})`,
          }}
        >
          <h1 className="titulo mt-10  text-white font-bold text-6xl">
            Dra. Mayra Lopez Benitez
          </h1>
          <p className="formato text-white max-w-lg mx-auto text-xl">
            Porque nos preocupamos por tu salud ofrecemos un servicio de
            calidad, para que puedas seguir sonriendo , agenda tu cita.
          </p>

          <div className=" mx-auto rounded-md">
            <Swiper
              className="mx-auto"
              spaceBetween={50}
              effect={"fade"}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={true}
              loop={true}
              modules={[Autoplay, Pagination, EffectFade, Navigation]}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {swiperImages.map((swiperImage, key) => (
                <SwiperSlide key={key}>
                  <img
                    src={swiperImage}
                    alt=""
                    className="w-[750px]  mx-auto rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <p className="formato max-w-lg mx-auto p-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum
          veritatis adipisci natus maxime. Ullam ipsa tenetur iure corrupti in
          maxime magni voluptatem debitis veritatis, architecto vero sint est
          dicta cupiditate deserunt repellendus molestias autem doloremque unde?
          Soluta tempore aliquam nisi dicta nam voluptatibus facere quos, sit
          dolorum vitae, eos cumque dolorem quis possimus modi. Hic consequatur
          aliquid in voluptate blanditiis. Nesciunt necessitatibus corporis,
          perspiciatis porro deserunt a natus molestiae consequuntur temporibus?
          Omnis inventore laboriosam autem? Distinctio odit repudiandae dolorem
          aut consequatur quia pariatur totam quisquam fugiat. Quas non sit
          ipsam, deserunt ullam dolorem suscipit expedita eveniet
          exercitationem, libero neque. Nihil.
        </p>
        <h1 id="servicios" className="titulo">
          Ofrecemos Servicios como:
        </h1>

        {/* <!-- cartas servicios --> */}
        <div className="container-card">
          <div className="card-father">
            <div className="card">
              <div className="card-enfrente imgEstetica">
                <div className="bg"></div>
                <div className="cuerpo-carta-enfrente">
                  <h1>Reparaciones esteticas</h1>
                </div>
              </div>
              <div className="card-atras">
                <div className="cuerpo-carta-atras">
                  <h1>Reparaciones esteticas</h1>
                  <p>
                    Las reconstrucciones estéticas son una solución para dientes
                    anteriores (incisivos, laterales o caninos)
                  </p>
                  {/* <!-- <input type="button" value="Leer más"> --> */}
                </div>
              </div>
            </div>
          </div>

          <div className="card-father">
            <div className="card">
              <div className="card-enfrente imgProtesis">
                <div className="bg"></div>
                <div className="cuerpo-carta-enfrente">
                  <h1>Protesis fijas y removibles</h1>
                </div>
              </div>
              <div className="card-atras">
                <div className="cuerpo-carta-atras">
                  <h1>Protesis</h1>
                  <p>
                    Es una estructura metálica con varios dientes artificiales
                    que se ancla a los dientes y sirve para reponer las piezas
                    ausentes.
                  </p>
                  {/* <!-- <input type="button" value="Leer más"> --> */}
                </div>
              </div>
            </div>
          </div>

          <div className="card-father">
            <div className="card">
              <div className="card-enfrente imgExodoncias">
                <div className="bg"></div>
                <div className="cuerpo-carta-enfrente">
                  <h1>Exodoncias</h1>
                </div>
              </div>
              <div className="card-atras">
                <div className="cuerpo-carta-atras">
                  <h1>Exodoncias</h1>
                  <p>
                    Es la intervención quirúrgica en el que se extrae un diente
                    de la cavidad oral.
                  </p>
                  {/* <!-- <input type="button" value="Leer más"> --> */}
                </div>
              </div>
            </div>
          </div>

          <div className="card-father">
            <div className="card">
              <div className="card-enfrente imgLimpiezaB">
                <div className="bg"></div>
                <div className="cuerpo-carta-enfrente">
                  <h1>Limpieza bucal</h1>
                </div>
              </div>
              <div className="card-atras">
                <div className="cuerpo-carta-atras">
                  <h1>Limpieza</h1>
                  <p>
                    Permite limpiar las “bolsas periodontales”, un espacio entre
                    la encía y el diente en donde se acumulan el sarro y las
                    bacterias causantes de la periodontitis.
                  </p>
                  {/* <!-- <input type="button" value="Leer más"> --> */}
                </div>
              </div>
            </div>
          </div>

          <div className="card-father">
            <div className="card">
              <div className="card-enfrente imgOrtodoncia">
                <div className="bg"></div>
                <div className="cuerpo-carta-enfrente">
                  <h1>Ortodoncia</h1>
                </div>
              </div>
              <div className="card-atras">
                <div className="cuerpo-carta-atras">
                  <h1>Ortodoncia</h1>
                  <p>
                    Se encarga de los problemas de los dientes y la mandíbula
                    para: Enderezar los dientes, Corregir problemas con la
                    mordida(frenos).
                  </p>
                  {/* <!-- <input type="button" value="Leer más"> --> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <p className="formato">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          consequatur quo! Tenetur possimus ut cumque, optio accusamus
          blanditiis inventore, dicta, autem veniam quaerat hic excepturi fugiat
          sint enim. Nesciunt architecto sapiente sequi tempore, unde ratione!
          Optio magnam ex distinctio sint voluptatibus voluptas asperiores quasi
          ducimus deleniti facilis temporibus odit doloremque ut, exercitationem
          modi. Quisquam, blanditiis necessitatibus. Impedit illo temporibus cum
          ipsa corporis maiores aperiam eligendi! Fugit similique porro
          consequatur maxime molestiae adipisci itaque ipsum. Fugit et,
          laudantium impedit dolorum soluta quo harum sequi non ratione.
          Officiis, vero ut optio soluta aut, magni consequatur ducimus officia
          modi illo quis qui. Aspernatur repudiandae temporibus expedita sed,
          rerum ratione ad saepe reprehenderit perspiciatis ut atque nobis
          maxime fugiat excepturi eos quia aperiam error tenetur necessitatibus
          aut accusantium. Id voluptatibus recusandae quae hic asperiores minus
          laborum? Adipisci fugit optio quidem, sunt molestias perspiciatis quo
          officia dicta beatae ullam perferendis aliquam inventore eaque
          accusantium odio consectetur doloribus odit! Magni iure beatae illum
          dolor obcaecati culpa illo ut excepturi nemo sit consectetur
          perspiciatis eligendi officia voluptates, alias distinctio earum fugit
          molestiae odit ex deserunt assumenda suscipit veritatis. Vitae
          aperiam, minus, tempora corporis id voluptates voluptatum quibusdam
          maiores odit accusantium asperiores ea repellendus! Aliquid in rerum
          temporibus?
        </p> */}
        <div className="mt-[500px] flex  sm:w-[800px] justify-center mx-auto flex-wrap">
          <div className="w-1/2  text-left">
            <h1 id="ubicacion" className="titulo">
              Ubicacion
            </h1>
            <p className="formato-ubicacion">
              <strong>Av. Del rastro 256.</strong> Colonia San Rafael. Toluca
              México
            </p>
          </div>
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d489.63443797482705!2d-99.62922459507178!3d19.321516115291477!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d275fc6fcdd857%3A0x66716d8a7a3b1078!2sConsultorio%20Dental%20Dra.%20Mayra%20L%C3%B3pez%20Ben%C3%ADtez!5e1!3m2!1ses!2smx!4v1669864533219!5m2!1ses!2smx"
              width="100%"
              height="550"
              style={{ border: "0" }}
              // allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
