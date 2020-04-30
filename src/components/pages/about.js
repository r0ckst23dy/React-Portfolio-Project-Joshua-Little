import React from 'react';
import aboutPic from "../../../static/assets/images/about/about.jpg";

const About = () => {
    return (
        <div className="content-page-wrapper">
            <div className="left-column"
                style={{
                    background: "url(" + aboutPic + ") no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center"
                }}
            />

            <div className="right-column">
                <h1>About Me </h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam minus fugit eos deleniti quod harum perferendis aut optio animi provident ea odio, soluta error cum culpa beatae voluptates repudiandae reiciendis.
                Quam tenetur sit eius enim, aliquid quia dicta officiis obcaecati fuga eligendi quae consequatur, temporibus esse magnam? Incidunt inventore quasi, facere harum placeat totam maiores repudiandae numquam id. Ea, excepturi!
                Natus deleniti dignissimos ullam distinctio molestias sunt explicabo, minima sequi velit, fugit amet, aliquam asperiores iste numquam porro quidem placeat laboriosam adipisci ad! Voluptatem, libero repudiandae. Quo repellendus eveniet ipsam!
                Aperiam illum, sapiente dolor recusandae est consequuntur quaerat iste neque possimus. Vitae, deserunt veniam maxime sed, similique quidem nisi debitis praesentium possimus assumenda excepturi maiores distinctio magnam ea eos. Quisquam.
                At mollitia esse, distinctio voluptas rerum laboriosam iure voluptate. Consequatur quisquam autem unde. Repellendus fugit in, nam, officiis, ipsum incidunt asperiores assumenda quia consequuntur error voluptas dolorum optio nemo minus.
                Reiciendis, ipsa laudantium? Error recusandae eius eaque quod asperiores rerum, earum excepturi cum nihil, obcaecati aliquam. Ea id hic et obcaecati quisquam minima quis doloremque dolore vel? Itaque, amet id!</p>
            </div>

        </div>
    );
}

export default About;