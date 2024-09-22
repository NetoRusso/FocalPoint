const calendario = (): string => {
  const data = new Date();
  const day = data.getDate().toString().padStart(2, '0');
  const month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][data.getMonth()];
  const year = data.getFullYear();
  const dayWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][data.getDay()];
  return (`${dayWeek}, ${day} de ${month} de ${year}`);
}

describe('teste da aplicação FocalPoint', () => {
  it('header-saudacao', () => {
    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="saudacao-usuario"]')
      .should("exist")
      .should('contain', 'Bem vindo de volta, Marcus');
  });

  it('header-calendario', () => {

    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.wait(1000).get('[data-testid="calendario"]')
      .should("exist")
      .should('contain', calendario());
  });

  it('Task-titulos-botao', () => {

    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="titulo-tarefas-hoje"]')
      .should("exist")
      .should('contain', 'Suas tarefas de hoje');

    cy.get('[data-testid="titulo-tarefas-finalizadas"]')
      .should("exist")
      .should('contain', 'Tarefas finalizadas');

    cy.get('[data-testid="btn-nova-tarefa"]')
      .should("exist")
      .should('contain.html', 'Adicionar nova tarefa');
  });

  it('Task-lista-tarefas', () => {
    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.wait(2000).get('[data-testid="item-list"]').should('have.length', 4);

    cy.get('[data-testid="item-list"]').eq(0).find('input[type="checkbox"]').should('not.be.checked');
    cy.get('[data-testid="item-list"]').eq(3).find('input[type="checkbox"]').should('be.checked');

    cy.get('[data-testid="item-list"]').eq(0).should('contain', 'Lavar as mãos');
    cy.get('[data-testid="item-list"]').eq(3).should('contain', 'Levar o lixo para fora');

    cy.get('[data-testid="item-list"]').each($el => {
      cy.wrap($el).find('img[alt="Icone de lixeira"]').should('exist');
    });
  });

  it('Task-modal-adicionar-tarefa', () => {
    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="btn-nova-tarefa"]').click();

    cy.wait(200).get('[data-testid="modal-criar-tarefa"]').should('be.visible');

    cy.get('input[name="title"]').type('Nova Tarefa');

    cy.wait(200).get('[data-testid="btn-criar-tarefa"]').click();

    cy.wait(200).get('[data-testid="modal-criar-tarefa"]').should('not.exist');

    cy.get('[data-testid="lista-tarefas"]').scrollTo('bottom');

    cy.get('[data-testid="lista-tarefas"] > [data-testid="item-list"]').should('have.length', 4);
    cy.get('[data-testid="lista-tarefas"] > [data-testid="item-list"]').last().should('contain', 'Nova Tarefa');
  });

  it('Task-modal-deletar-tarefa', () => {
    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="item-list"]').eq(0).find('img[alt="Icone de lixeira"]').click();


    cy.get('[data-testid="modal-deletar-tarefa"]').should('be.visible');
    cy.get('[data-testid="titulo-deletar-tarefa"]').should('contain', 'Deletar Tarefa');
    cy.get('[data-testid="texto-deletar-tarefa"]').should('contain', 'Tem certeza que você deseja deletar essa tarefa?');

    cy.get('[data-testid="btn-deletar-tarefa"]').click();

    cy.get('[data-testid="modal-deletar-tarefa"]').should('not.exist');

    cy.get('[data-testid="lista-tarefas"] > [data-testid="item-list"]').should('have.length', 2);
  });

  it('Task-marcar-tarefa-como-concluida', () => {
    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    cy.get('[data-testid="item-list"]').eq(0).find('input[type="checkbox"]').click();

    cy.get('[data-testid="lista-tarefas-finalizadas"] > [data-testid="item-list"]').eq(0).find('input[type="checkbox"]').should('be.checked');

    cy.get('[data-testid="lista-tarefas-finalizadas"]').find('[data-testid="item-list"]').should('have.length', 2);
    cy.get('[data-testid="lista-tarefas-finalizadas"]').find('[data-testid="item-list"]').should('contain', 'Lavar as mãos');
  });

  it('Task-desmarcar-tarefa-como-concluida', () => {
    cy.viewport(1440, 768);
    cy.visit('http://localhost:3000');

    // Clicar no checkbox da primeira tarefa (que já está na lista de tarefas finalizadas)
    cy.get('[data-testid="lista-tarefas-finalizadas"]').find('[data-testid="item-list"]').eq(0).find('input[type="checkbox"]').click();

    // Validar se o status da tarefa muda para "não concluída"
    cy.get('[data-testid="lista-tarefas-finalizadas"]').find('[data-testid="item-list"]').should('not.exist');

    // Validar se a tarefa é movida para a lista de tarefas ativas
    cy.get('[data-testid="lista-tarefas"]').find('[data-testid="item-list"]').should('have.length', 4);
    cy.get('[data-testid="lista-tarefas"]').scrollTo('bottom');
    cy.get('[data-testid="lista-tarefas"]').find('[data-testid="item-list"]').should('contain', 'Lavar as mãos');
  });

});