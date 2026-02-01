const FloatingHelpButton = () => {
  return (
    <button
      className="fixed bottom-6 right-6 w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center text-lg font-medium hover:scale-110 transition-transform shadow-lg"
      aria-label="Help"
    >
      ?
    </button>
  );
};

export default FloatingHelpButton;
