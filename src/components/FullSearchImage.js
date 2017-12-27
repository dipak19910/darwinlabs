import React from 'react'
import Api from '../api'
import { Link } from 'react-router-dom'

// The FullRoster iterates over all of the players and creates
// a link to their profile pa
class FullSearchImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isLoading:false,
            data:{}

        };
    }
    componentDidMount(){
        this.setState({isLoading: true});
        let result = Api.get({path: `/search`,body:{name:this.state.name}}).then(result=>{
            this.setState({
                data: result,
                isLoading: false,
                isVisible:true
            });
        }).catch(error=>{
            this.setState({isLoading: false,error:error.message});
            console.log(error);
        });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading content.......</div>;
        }
        if(this.state.error){
            return <div>Error: <span>{this.state.error}</span></div>
        }
        return (<div>
            <SelectCompoent isVisible={this.state.isVisible} items={this.state.data} {...this.props}/>
        </div>);
    }

}

const SelectCompoent=({items,isVisible,history})=>{
    if(!isVisible){
        return null;
    }
    if(!items || !items.length){
        return <div>Data not found</div>;
    }
    let Component = [];
    items.unshift({_id: "all"});
    return (<div>
        <span>Select search value</span>
        <select onChange={e=>{
            history.push({
                pathname: `/search/name/${e.target.value}`
            });
        }}>
            {items.map(row=>{
               return  <option value={row._id}>{row._id}</option>
            })}
        </select>
    </div>);

}
export default FullSearchImage;
