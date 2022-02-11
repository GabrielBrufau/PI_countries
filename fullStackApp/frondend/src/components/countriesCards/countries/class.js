export function Countries(){
        const dispatch = useDispatch();
        const countries = useSelector(state=>state.countries);
        const Action = new Actions;

        useEffect(()=>{
                dispatch(Action.countriesGetAll());
        },[dispatch]);

        return(
                        <div>
                         <h1>All countries</h1>
                         {countries.length && countries.map((country)=>{
                                <Country 
                                        name={this.countries.name}
                                        continent={this.countries.contient}
                                        capital={this.countries.capital}
                                        flag={this.countries.flag}
                                />
                         }
                         )};
        )
}

export default class Countries extends React.Component{
        contructor(){
                props();
                this.dispatch = useDispatch();
                this.countries = useSelector(state => state.countries);
                this.Action = new Actions;
                this.useEffect = this.useEffect.bind(this);
                this.dispatchActions = this.dispatchActions.bind(this);
        }

        dispatchActions(){
                this.dispatch(this.Action.countriesGetAll());
        }
        useEffect(this.dispatchActions,[dispatch])  //aca esta dispatch como dependencia no se que significa jaja

        render(                                                                                                                                                                                                                                                                                                            
                return(                                                                                                                                                                                                                                                                                                    
                        <div>                                                                                                                                                                                                                                                                                              
                         <h1>All countries</h1>                                                                                                                                                                                                                                                                            
                        {this.countries.length && this.countries.map(country =>                                                                                                                                                                                                                                            
                                <Country                                                                                                                                                                                                                                                                                   
                                        name={this.countries.name}                                                                                                                                                                                                                                                         
                                        continent={this.countries.contient}                                                                                                                                                                                                                                                
                                        capital={this.countries.capital}                                                                                                                                                                                                                                                  
                                        flag={this.countries.flag}                                                                                                                                                                                                                                                         
                                />                                                                                                                                                                                                                                                                                         
                        }                                                                                                                                                                                                                                                                                                  
                        )                                                                                                                                                                                                                                                                                                  
                )                                                                                                                                                                                                                                                                                                          
        )                                                                                                                                                                                                                                                                                                                  
}            
