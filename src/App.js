import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase'
import image from './card-image.jpg'

class App extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { title, description, author } = doc.data();
            boards.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description,
                author,
            });
        });
        this.setState({
            boards
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    delete(id){
        firebase.firestore().collection('boards').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="card boards-card ">
                    <img className="card-img-top" src={image} alt="Card image cap"/>
                    <div className="card-heading text-center">
                        <h1 className="card-title">
                            READING LIST
                        </h1>
                    </div>
                    <div className="card-body text-center">
                        <h4><Link to="/create" className='btn btn-info'>Add New Book</Link></h4>
                        <table className="table table-stripe">
                            <thead className="thead-dark">
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.state.boards.map(board =>
                                <tr>
                                    <td >{board.title}</td>
                                    <td className='text-info'>{board.description}</td>
                                    <td>{board.author}</td>
                                    <td><Link to={`/edit/${board.key}`} className="btn btn-success">Edit</Link>&nbsp;</td>
                                    <td><button onClick={this.delete.bind(this, board.key)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
