// # 2) Importation d'un objet 'sujet' qui permettera de caster les infos - à l'état actuel - aux "observateurs"
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


// # 4) Création d'un état par défaut
const state = {
    userID: null,
    username: '',
    xp: null,
    lvl: null,
    gold: null,
    bossLife: null,
    weaponLvl: 0
}


// # 8) Création d'une interface pour notre state pour être certains des données qui seront updatées
interface State {
    userID: number,
    username: string,
    xp: number,
    lvl: number
    gold: number,
    bossLife: number,
    weaponLvl: number
}


// # 3) Création d'une instance de notre store au-dessus de notre class, afin de nous assurer qu'il n'y aura qu'un SEUL store
const store = new BehaviorSubject<any>(state) // # 5) On injecte notre état par défut lors du chargement de l'app


// # 1) Création d'une classe qui représentera notre store
export class Store {

    store = store
    // # 6) Création d'un "abonnement" au moindre changement dans le store
    //      La variable "changes" va devenir cet observable
    changes = store.asObservable()
                   .distinctUntilChanged()
                //    .do(changes => console.log('◇   new state', changes))



    // # 7) Le "BehaviorSubject" va nous permettre d'accéder à l'état actuel - de façon synchrone - avec la propriété value
    getState() {
        return this.store.value
    }


    // # 9) Création d'une méthode qui updatera notre store avec le state rendu
    setState(state: State) {
        console.log('◉ setState', state)
        this.store.next(state)
    }
}