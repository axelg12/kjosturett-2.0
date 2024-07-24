import Party from './components/Party/Party';
import parties from '../data/parties.json';
import PartyGrid from './components/PartyGrid/PartyGrid';

export default function Home() {
  return (
    <PartyGrid>
      {parties.map((party) => (
        <Party {...party} key={party.letter} href={`/flokkur/${party.url}`} />
      ))}
    </PartyGrid>
  );
}
