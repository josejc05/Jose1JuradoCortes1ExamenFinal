document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('entry-form');
    const entriesSection = document.getElementById('entries-section');

    function createEntry(title, content) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');

        const titleEl = document.createElement('h3');
        titleEl.textContent = title;

        const contentEl = document.createElement('p');
        contentEl.textContent = content;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', () => {
            fetch('/entries/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content })
            })
                .then(res => {
                    if (!res.ok) throw new Error('Error al eliminar entrada');
                    entriesSection.removeChild(entryDiv);
                })
                .catch(err => {
                    console.error(err);
                    alert('No se pudo eliminar la entrada.');
                });
        });

        entryDiv.appendChild(titleEl);
        entryDiv.appendChild(contentEl);
        entryDiv.appendChild(deleteBtn);
        entriesSection.appendChild(entryDiv);
    }

    fetch('/entries')
        .then(res => res.json())
        .then(entries => {
            entries.forEach(entry => {
                createEntry(entry.title, entry.content);
            });
        })
        .catch(err => {
            console.error('Error al cargar entradas:', err);
        });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = form.title.value.trim();
        const content = form.content.value.trim();

        if (!title || !content) return;

        const newEntry = { title, content };

        fetch('/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al guardar entrada');
                return res.json();
            })
            .then(() => {
                createEntry(title, content);
                form.reset();
            })
            .catch(err => {
                console.error(err);
                alert('Hubo un problema al guardar la entrada.');
            });
    });
});