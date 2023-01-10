class LoginRouter {
  route(httpRequest: any) {
    const response = {
      statusCode: 200,
    };
    if (!httpRequest.body.email) {
      response.statusCode = 400;
    }
    return response;
  }
}

describe("Login Router", () => {
  test("Devemos retornar 400 caso o email não seja informado", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test("Devemos retornar 400 caso a senha não seja informada", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
