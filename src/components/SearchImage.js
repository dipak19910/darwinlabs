import React from "react";

import Api from "../api";
class SearchImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.match.params.name,
            isLoading:false,
            data:{}

        };
    }
    componentDidMount(){
        this.setState({isLoading: true});
        let result = Api.get({path: `/search/name/${this.state.name}`}).then(result=>{
            this.setState({
                data: result,
                isLoading: false,
                isVisible:true
            });
        }).catch(error=>{
            this.setState({isLoading: false});
            console.log(error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Uploading images to server.......</div>;
        }
        return (<div>
            <span>List Image</span>
            <ImageComponent isVisible={this.state.isVisible} items={this.state.data}/>
        </div>);
    }

}

const ImageComponent=({items,isVisible})=>{
    if(!isVisible){
        return null;
    }
    if(!items || !items.length){
        return <div>Data not found</div>;
    }
    let Component = [];
    for(let i=0;i<items.length;i=i+4){
        Component.push(
            <tr>
                {items[i + 0] && <td><img src={items[i + 0].serverLink} width={75} height={75}/></td>}
                {items[i + 1] && <td><img src={items[i + 1].serverLink} width={75} height={75}/></td>}
                {items[i + 2] && <td><img src={items[i + 2].serverLink} width={75} height={75}/></td>}
                {items[i + 3] && <td><img src={items[i + 3].serverLink} width={75} height={75}/></td>}
            </tr>
        );
    }
    return <div>

        <table >
            {Component}
        </table>
    </div>;

}
export default SearchImage
