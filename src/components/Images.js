import React from "react";

import Api from "../api";
class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isLoading:false,
            data:{}

        };
    }

    render() {
        if (this.state.isLoading) {
            return <div>Uploading images to server.......</div>;
        }
        return (<div>
            <input type="text" value={this.state.name} onChange={e=>{
                this.setState({name: e.target.value});
            }}/>
            <button type="button"  onClick={_ => {
                this.setState({isLoading: true});
                let result = Api.get({path: `/images`,body:{name:this.state.name}}).then(result=>{
                    this.setState({
                        data: result,
                        isLoading: false,
                        isVisible:true
                    });
                }).catch(error=>{
                    console.log(error);
                });
            }}>Load image to server from google CSE
            </button>
                <ImageComponent isVisible={this.state.isVisible} items={this.state.data.items}/>
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
                {items[i + 0] && <td><img src={items[i + 0].image.thumbnailLink+"?1222259157.415"} width={75} height={75}/></td>}
                {items[i + 1] && <td><img src={items[i + 1].image.thumbnailLink} width={75} height={75}/></td>}
                {items[i + 2] && <td><img src={items[i + 2].image.thumbnailLink} width={75} height={75}/></td>}
                {items[i + 3] && <td><img src={items[i + 3].image.thumbnailLink} width={75} height={75}/></td>}
            </tr>
        );
    }
    return <div>

        <table >
            {Component}
        </table>
    </div>;

}
export default Images
