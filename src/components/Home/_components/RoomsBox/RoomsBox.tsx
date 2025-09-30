import { RoomsCardList } from "../RoomsCardList";

function RoomsBox() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Salas Disponibles
        </h2>
      </div>
      <RoomsCardList />
    </div>
  );
}
export default RoomsBox;
