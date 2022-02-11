export default class Country extends React.Component{
        constructor(props){
                super(props);/*aca vendrian las props del componente
                que lo llama*/
                this.state = { 
                        some:"some"
                }
        }
        render(
                return (
                        <div>
                         <h1>{this.name}</h1>
                         <h2>{this.continent}</h2>
                         <h2>{this.capital}</h2>
                         <img>src={this.flag} alt="no find image"></img>
                        </div>
                )
        )
}

