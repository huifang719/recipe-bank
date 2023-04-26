import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';

const schema = z.object({
  query:z.string().min(3, {message: "Search keywords must contain at least 3 character(s)"})
})

type FormData = z.infer<typeof schema>

const Home: React.FC = () => {
  const {register,handleSubmit, formState:{errors, isSubmitting}} = useForm<FormData>({resolver:zodResolver(schema)})

  const search = (data: FieldValues) => {
    console.log(data)
    console.log('miao')
  }
  return (
    <IonPage>
      <IonHeader color="tertiary">
        <IonToolbar>
          <IonTitle>Recipe Bank</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonTitle></IonTitle>
          <IonSearchbar animated={true} placeholder="Search for recipe" {...register('query')} onChange={handleSubmit(search)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
