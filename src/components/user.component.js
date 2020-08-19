import React, { Component } from "react";
import productDataService from "../services/product.service";
import axios from 'axios' ;
import { Link } from "react-router-dom";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
    this.onChangepPassword = this.onChangepPassword.bind(this);
    this.onChangepIsAdmin = this.onChangepIsAdmin.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updatepUserIsAdmin = this.updatepUserIsAdmin.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        user: "",
        avatar: "",
        email: "",
        isadmin: false,
        password: "",
        selectedFile: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeUser(e) {
    const user = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          user: user
        }
      };
    });
  }

  onChangeAvatar(e) {
    const avatar = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        avatar: avatar
      }
    }));
  }


  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email
      }
    }));
  }

  onChangepassword(e) {
    const password = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      };
    });
  }

  onChangepIsAdmin(e) {
    const isadmin = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          isadmin: isadmin
        }
      };
    });
  }

  onChangeItem(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          [name]: value
        }
      };
    });
  }


  getUser(id) {
    console.log('user id trg getUser: ' + id);
    productDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatepUserIsAdmin(isadmin) {
    var data = {
      id: this.state.currentUser.id,
      user: this.state.currentUser.user,
      email: this.state.currentUser.email,
      products_soluong: this.state.currentUser.products_soluong,
      products_retail: this.state.currentUser.products_retail,
      password: this.state.currentUser.password,
      products_nguonphim: this.state.currentUser.products_nguonphim,
      products_chatluong: this.state.currentUser.products_chatluong,
      products_dienvien: this.state.currentUser.products_dienvien,
      products_ngaynhaphang: this.state.currentUser.products_ngaynhaphang,
      isadmin: isadmin
    };

    productDataService.update(this.state.currentUser.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUser: {
            ...prevState.currentUser,
            isadmin: isadmin
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  fileSelectedHandler = event => {
    const avatar = event.target.files[0].name
    console.log('file SMALL selected handler');
    this.setState({
        selectedFile: event.target.files[0],
    })
    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          avatar: "../products/" + avatar
        }
      };
    });
  }
  
  
  //works great 6/26/2020
  updateUser() {
    // khong biet EDIT o dau, o dau chi la id chu khong con la id nhu trong table
    console.log('product id trong update: ' + this.state.currentUser.id);
    //console.log('current product trong update: ' + this.state.currentUser);

    productDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        // Sequelize xong
        console.log(response.data);

        // Xu ly tiep phan upload file
        const fd = new FormData();

        // neu co chon file hinh de upload thi moi chay khuc upload nay
        if (this.state.selectedFile) {
            fd.append("upfile", this.state.selectedFile);
            console.log("ten file se up la " + this.state.selectedFile.name);
           
            // tat ca cac function tren backend deu bat dau la localhost:8080/api
            // con dieu do qui dinh o dau thi khong biet luon
            axios({
                url: "http://localhost:8080/api/upfile",
                method: "post",
                data: fd,
            }).then(res => {
                console.log('file upload result: ' + res.isadminText);
            }).catch(e => {
              console.log(e);
            })
          }

        this.setState({
          message: "The product was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });

      this.props.history.push("/products");
      // window.location="/";
  }

  //works great 6/26/2020
  deleteProduct() {  
    console.log('vo delete func   :  ' + this.state.currentUser.id);  
    productDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/products')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="border col">
        <Link to="/">Back to Home page</Link>
        {currentUser ? (
          <div className="edit-form">
            <h4>Product Update</h4>
            <form>
              <div className="form-group">
                <label htmlFor="user">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="user"
                  value={currentUser.user}
                  onChange={this.onChangeUser}
                />
                <img src={"/products/" + currentUser.avatar} alt={currentUser.avatar}></img>
              </div>
              <div className="form-group">
                <label htmlFor="email">Small image</label>
                <input
                  type="text"
                  className="form-control"
                  id="avatar"
                  value={currentUser.avatar}
                  onChange={this.onChangeAvatar}
                />
                <input className="s_image" type="file" onChange={this.fileSelectedHandler}></input>
              </div>
              <div className="form-group">
                <label htmlFor="email">Price</label>
                <input
                  type="text"
                  className="product-price"
                  id="email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
                <label htmlFor="products_soluong">Quantity: </label>
                <input
                  type="text"
                  className="product-qty"
                  id="products_soluong"
                  value={currentUser.products_soluong}
                  onChange={this.onChangepPassword}
                />
              
              </div>
              <div className="form-group">
                <label>Retail</label>
                <input
                  type="text"
                  className="product-other"
                  id="email"
                  value={currentUser.products_retail}
                  onChange={this.onChangepIsAdmin}
                />

                <label>Episode</label>
                <input
                  type="text"
                  className="product-other"
                  id="password"
                  value={currentUser.password}
                  onChange={this.onChangepassword}
                />
              </div><div className="form-group">
                <label>Source </label>
                <input
                  type="text"
                  className="product-other"
                  id="products_nguonphim"
                  value={currentUser.products_nguonphim}
                  onChange={this.onChangeItems_nguonphim}
                />

                <label>Quality</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_chatluong"
                  value={currentUser.products_chatluong}
                  onChange={this.onChangeItems_chatluong}
                />
              </div>
              <div className="form-group">
                <label>Actors</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_dienvien"
                  name="products_dienvien"
                  value={currentUser.products_dienvien}
                  onChange={this.onChangeItems_dienvien}
                />
              </div><div className="form-group">
                <label>Release Date</label>
                <input
                  type="text"
                  className="product-other"
                  id="products_ngaynhaphang"
                  value={currentUser.products_ngaynhaphang}
                  onChange={this.onChangeItems_ngaynhaphang}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>isadmin:</strong>
                </label>
                {currentUser.isadmin ? "Display" : "No Display"}
              </div>
            </form>

            {/* nut isadmin update nay de hoc hoi cho vui chu hong co khac biet gi ro rang voi cac field khac */}
            {currentUser.isadmin ? (
              <button
                className="btn badge-primary mr-2"
                onClick={() => this.updatepUserIsAdmin(false)}
              >
                Hide This Product
              </button>
            ) : (
              <button
                className="btn btn-info mr-2"
                //button badge-primary mr-2
                onClick={() => this.updatepUserIsAdmin(true)}
              >
                Show This Product
              </button>
            )}

            <button
              className="btn btn-danger"
              //button badge-danger mr-2
              onClick={this.deleteProduct}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              // button badge-success
              onClick={this.updateUser}
            >
              Update
            </button>
            <button onClick={this.props.history.goBack} type="button" className="btn btn-danger" data-dismiss="modal">Discard</button>
            <p>{this.state.message}</p>
          </div>
          

        ) : (
          <div>
            <br />
            <p>Please click on a Product...</p>
          </div>
        )}
      </div>
    );
  }
}
