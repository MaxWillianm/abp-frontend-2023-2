import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

function EditProduto() {
    const [produto, setProduto] = useState({
        nome: "",
        valor: "",
        cor: "",
        descricao: "",
        image: null,
    });
    const [carregando, setCarregando] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const Url = "http://localhost/backend-ABP-front/produto/edit/";
    const { id } = useParams();
    const getUrl = "http://localhost/backend-ABP-front/produto/view/" + id;
    
    const schema = yup.object().shape({
        nome: yup.string().required("Nome é obrigatório"),
        valor: yup
            .number()
            .required("Valor é obrigatório")
            .positive("Valor deve ser um número positivo"),
        cor: yup.string().required("Cor é obrigatória"),
        descricao: yup.string().required("Descrição é obrigatória"),
    });

    useEffect(() => {
        const fetchProductData = async () => {
            setCarregando(true);

            try {
                const response = await axios.get(getUrl);
                const { data } = response;
                setProduto(data.Produto);

            } catch (error) {
                console.error(error);
            }

            setCarregando(false);
        };

        fetchProductData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCarregando(true);
        try {
            const formData = new FormData();
            formData.append("produto", JSON.stringify(produto));
            formData.append("image", produto.image);

            if (schema.validateSync(produto)) {
                console.log("validou");
            } else {
                throw new Error("Não validou");
            }
            const response = await axios.put(Url + produto.id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            setIsFormSubmitted(true);
            setProduto({
                nome: "",
                valor: "",
                cor: "",
                descricao: "",
                image: null,
            });
        } catch (error) {
            console.error(error);
        }

        setCarregando(false);
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "file") {
            setProduto((prevProduto) => ({
                ...prevProduto,
                [name]: event.target.files[0],
            }));
        } else {
            setProduto((prevProduto) => ({ ...prevProduto, [name]: value }));
        }
    };

    return (
        <div className="container">
            <div className="bg-black-div/90 border border-white rounded-xl  my-20 py-12 px-8">
                <form
                    id="formProduto"
                    className="flex flex-col space-y-12"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="ml-5 bg-black-input text-white rounded px-4 py-3"
                        placeholder="Nome"
                        type="text"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                    />
                    <input
                        className="ml-5 bg-black-input text-white rounded px-4 py-3"
                        placeholder="Valor"
                        type="number"
                        name="valor"
                        value={produto.valor}
                        onChange={handleChange}
                    />
                    <input
                        className="ml-5 bg-black-input text-white rounded px-4 py-3"
                        placeholder="cor"
                        type="text"
                        name="cor"
                        value={produto.cor}
                        onChange={handleChange}
                    />
                    <input
                        className="ml-5 bg-black-input text-white rounded px-4 py-3"
                        placeholder="Descrição"
                        type="text"
                        name="descricao"
                        value={produto.descricao}
                        onChange={handleChange}
                    />
                    <input
                        className="ml-5 bg-black-input text-white rounded px-4 py-3"
                        placeholder="Imagem"
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                    <button
                        className="text-white flex w-1/4 mx-auto justify-center items-center bg-blue-high rounded p-5 transition-all hover:bg-blue-light"
                        type="submit"
                        disabled={carregando}
                    >
                        {carregando ? (
                            <img
                                src="../../public/svg/loading_white.svg"
                                className="w-9 h-9"
                            />
                        ) : (
                            "Salvar"
                        )}
                    </button>
                    {isFormSubmitted == true ? (
                        <p className="text-white">Produto salvo com sucesso!</p>
                    ) : (
                        <p className="text-white">Preencha todos os campos</p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default EditProduto;
