const brMoney = (numero) => {
  const formatNumber = numero.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatNumber;
};

export { brMoney };
