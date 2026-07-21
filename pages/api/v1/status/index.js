function status(request, response) {
  response.status(200).json({
    chave: "sao acima da media",
  });
}

export default status;
