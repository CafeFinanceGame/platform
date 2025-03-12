interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export const HeroSection: React.FC<Props> = () => {
  return (
    <section
      className="h-screen w-full bg-primary flex flex-col justify-center items-center"
      id="hero"
    >
      <div className="flex flex-row gap-4">
        <h1>
          <span>Ca</span>
          <span>Fi</span>
        </h1>
        <p>Social PvP Game</p>
        <p>
          CoFi Game is a cafe business simulation game where players will play
          one of the types of companies in the cafe ecosystem and interact with
          other players to build a competitive market.
        </p>
      </div>
    </section>
  );
};
