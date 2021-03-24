import React from 'react'

class Registrar extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            nomeDoUsuário: "",
            emailDoUsuário: "",
            senhaDoUsuário: ""
        }
    }

    quandoONomeAlterar = (event) => {
        this.setState({ nomeDoUsuário: event.target.value });
    }

    quandoOEmailAlterar = (event) => {
        this.setState({ emailDoUsuário: event.target.value });
    }

    quandoASenhaAlterar = (event) => {
        this.setState({ senhaDoUsuário: event.target.value });
    }

    aoApertarOBotãoRegistrar = () => {
        fetch('https://powerful-anchorage-32277.herokuapp.com/registrar', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                nome: this.state.nomeDoUsuário,
                email: this.state.emailDoUsuário,
                senha: this.state.senhaDoUsuário
             })
        })
        .then(reposta => reposta.json())
        .then(usuário => {
            if (usuário.id)
            {
                this.props.carregarUsuário(usuário);
                this.props.quandoARotaAlterar('início');
            }
            else
            {
                
            }
        });
    }

    render()
    {
        return (
            <article className="br3 ba dark-gray b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 white"> Registrar </legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 white" htmlFor="name"> Nome </label>
                            <input onChange = { this.quandoONomeAlterar } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 red" type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 white" htmlFor="email-address"> Email </label>
                            <input onChange = { this.quandoOEmailAlterar } className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 red" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 white" htmlFor="password"> Senha </label>
                            <input onChange = { this.quandoASenhaAlterar } className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 red" type="password" name="password"  id="password" />
                        </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" onClick = { this.aoApertarOBotãoRegistrar } type="submit" value="Registrar" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Registrar;
