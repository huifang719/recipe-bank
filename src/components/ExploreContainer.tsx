import './ExploreContainer.css';
import Cuisine from './Cuisine';
import { IonGrid, IonRow, IonCol} from '@ionic/react';
interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const cuisines = ['Asian', 'Italian', 'Mexican' ]
  return (
    <div className="container">
      <IonGrid>
        <IonRow>
          {cuisines.map(cuisine =><IonCol size-sm="12" size-md="6" size-lg="4"><Cuisine cuisine={cuisine} /></IonCol>)} 
        </IonRow>
      </IonGrid>
         
    </div>
  );
};

export default ExploreContainer;
