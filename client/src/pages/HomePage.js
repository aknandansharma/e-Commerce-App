import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {Button, Checkbox, Radio} from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-hot-toast';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [cart, setCart] = useCart()

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get all produccts
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  // get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(page === 1) return;
    loadMore()
  }, [page])

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true)
       const { data } = await axios.get(
         `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
       );
       setLoading(false)
       setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All products - Best Offers"}>
      <div className="flip-box">
        <div className="flip-box-inner">
          <div className="flip-box-front">
            <img
              src="https://lh3.googleusercontent.com/BmuMWGspyTR5ChyuMezFbu9SAGStJBhbT1OZ3fQA8yxPr2Pj2-BMGs8hiQLYoAwn91nHYDm-IlxWp0VUBSk1SmVo38aH7JK_y17lF66r7zpMlbz-2riyl8ldF0bE7dDjg5mNafZ5ANxdijBRGn551q_BX-NTWUu_85YlCqZXpY9EGRghJd4rLYFzMEafmIHrpKODrboHPALjZMhHxSYs7wXTA_o7xySuuqOnW-6Q_eWAELjltZAfuoG3n0D7i3oQgDy-dWSiYdJOjw1MkSLEo7-D7DGPGdc7Ha1ts6KcVIyyeZgnDqbdGhb0TaxfRp7Owt-fowHfBrEOiwnDyXMYYSRM3az0-AN7DWQhxipNv7mKnuups7nsxA2uHztdfpRBZfVB57Yd5p0r9X0AzvPY6qc4aMDpADOPkoTOlkcQsOtkW2YrZut_4TcgPJA_zOoBWN6pKw_aa4t6GpnT4JJegvSSAXQua1tzfd0HcvYKQZwzPDNjXFbRlCNoVwDEG00c-E7VWctp5OwpQAxJP5lGtvraq9pT0jlyOHENqTP5dlpcF7eGby5pXyNI5tUPhf2B-usLptRDgHMibNpkRYw_q7gicp-NRh6Mk0yRAiwOGSYJnYt3c0jLOb-CfXb9o-IQkE1OFPI-yUc83EWJK5kJg_2r1UrvLYL9APiUxgThx5zBRrzW0D4bu27Id8krTXLU-L9oydsgKojKjvfTqt939myQ_lDzN_5maFN9f3bXqbRVXLImGXXKq6G4p2R-p2LqLO8uQ-WO_bxNAdGJD8W_9e79dACanCsiAcPgO6ZJcHwngwWo0G3svQIzfIVw_eBoivta_qzKyQZEDdlRHZs4j9seHnDh6KsGZAUqKfS4dvlCJGYA2lZt1y_EDkK2gymMVvPfZeD41QvRw_w6QREqXDqeTFyZ72V1_uNJYsyIAIUoDI2sdg=w1038-h585-s-no?authuser=0"
              alt="Paris"
              style={{ width: "100%", height: "510px" }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <h3 className="text-center mt-4 filter">Filter By Category</h3>
          <div className="d-flex flex-column cate">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Prices Filter */}
          <h3 className="text-center mt-4 filter">Filter By Prices</h3>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-danger mt-4 "
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center filter">All Products</h1>
          <div className="d-flex flex-wrap ">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="imgsize "
                  alt={p.name}
                />
                <div className="card-body cartBody">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 29)}...
                  </p>
                  <p className="card-text text-center font-size-10">
                    {" "}
                    $ {p.price}
                  </p>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3 loadingbtn">
            {products && products.length < total && (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                loading
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage