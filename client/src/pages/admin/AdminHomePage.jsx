import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHomePage = () => {
  const [user] = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1>
            Welcome Admin{" "}
            <i className="text-success bg-light">
              <b>{user?.name}</b>
            </i>
          </h1>
          <hr />
          <h2>Manage Blood Bank App</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            pariatur, ipsum cupiditate perspiciatis, adipisci dignissimos est
            itaque similique quia hic quibusdam porro iste, autem molestiae sed
            modi? Id voluptas aliquid fugit? Tempore amet soluta exercitationem
            nihil nam repudiandae error atque molestias quas, quisquam
            distinctio eos provident doloribus maiores ipsam iste, iure dolor,
            possimus quidem quam nesciunt. Maxime totam doloribus quibusdam
            debitis placeat. Eaque quos amet vel. Deleniti vel enim itaque, nam
            eos id ab voluptatibus optio cum repudiandae quisquam ratione qui,
            unde consectetur excepturi? Quas tenetur, nihil expedita aperiam
            aliquid distinctio? Eligendi dolores voluptate fuga eaque maiores
            sint odit perferendis molestiae necessitatibus, magnam assumenda
            ipsam maxime debitis rem excepturi soluta, quas placeat doloremque
            qui. Architecto officiis natus possimus consectetur adipisci iste
            quam, nam quas quaerat! Aliquam tempora modi perferendis! Doloribus
            veritatis dolore voluptatibus, minima illo soluta repellat iure rem
            explicabo quisquam, nesciunt fuga culpa. Quasi aliquid earum natus.
            Sapiente, quibusdam, sunt ullam qui atque error fugiat veniam nam
            dolore vitae numquam doloremque praesentium mollitia, deserunt
            explicabo libero dolorem ipsam dicta! Temporibus nam quas odio eius,
            facere sapiente possimus itaque mollitia exercitationem nesciunt.
            Placeat eum adipisci repellendus pariatur sed expedita distinctio
            eius delectus, eos harum inventore iste beatae quaerat similique
            magni?
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHomePage;
