import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, PawPrint, Upload, Image, Heart, Sparkles } from 'lucide-react';
import api from '../api/api';
import uploadHelper from '../utils/uploadHelper';

export default function CreatePet() {
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    ageCategory: '',
    gender: '',
    size: '',
    behavior: '',
    price: '',
    description: '',
    photos: []
  });

  const [uploading, setUploading] = useState(false);
  const [includeHealth, setIncludeHealth] = useState(false);
  const [health, setHealth] = useState({
    title: 'Initial health record',
    notes: '',
    attachments: [],
    vaccinationStatus: false,
    vaccinationCard: '',
    lastVaccinationDate: '',
    nextVaccinationDate: '',
    vaccines: { dog: {}, cat: {}, bird: {} },
    deworming: { lastDate: '', nextDate: '' },
    sterilization: { status: false, date: '', clinicName: '' },
    medicalConditions: { behaviouralNotes: '' },
    physicalExam: { weightKg: '' },
    labTests: { dog: {}, cat: {}, bird: {} },
    microchip: { id: '', registered: false },
    vet: { name: '' },
    grooming: {},
    feeding: {}
  });

  const nav = useNavigate();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadHelper(file);
      setForm(prev => ({ ...prev, photos: [...prev.photos, url] }));
    } catch {
      alert('Upload failed');
    }
    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        species: form.species.toLowerCase(),
        medical: includeHealth ? health : undefined
      };
      await api.post('/pets', payload);
      nav('/pets');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create pet');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-pink-600 rounded-full font-semibold shadow-md border-2 border-pink-200">
          <Home size={20} /> Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-orange-100">
          <div className="bg-gradient-to-r from-orange-200 to-pink-200 p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <PawPrint size={36} />
              <h2 className="text-4xl font-bold">Add a New Pet</h2>
              <Heart size={36} />
            </div>
          </div>

          <form onSubmit={submit} className="p-8 space-y-6">

            {/* BASIC INFO */}
            <input required placeholder="Pet Name" className="w-full p-4 border rounded-xl"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

            <div className="grid md:grid-cols-2 gap-4">
              <select required className="p-4 border rounded-xl"
                value={form.species} onChange={e => setForm({ ...form, species: e.target.value })}>
                <option value="">Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
              </select>

              <input placeholder="Breed" className="p-4 border rounded-xl"
                value={form.breed} onChange={e => setForm({ ...form, breed: e.target.value })} />
            </div>

            {/* QUIZ-CRITICAL FIELDS */}
            <div className="grid md:grid-cols-2 gap-4">
              <select required className="p-4 border rounded-xl"
                value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select required className="p-4 border rounded-xl"
                value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
                <option value="">Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <select required className="p-4 border rounded-xl"
                value={form.ageCategory} onChange={e => setForm({ ...form, ageCategory: e.target.value })}>
                <option value="">Age Category</option>
                <option value="young">Young (0–2)</option>
                <option value="adult">Adult (2–6)</option>
                <option value="senior">Senior (6+)</option>
              </select>

              <select required className="p-4 border rounded-xl"
                value={form.behavior} onChange={e => setForm({ ...form, behavior: e.target.value })}>
                <option value="">Behavior</option>
                <option value="calm">Calm</option>
                <option value="playful">Playful</option>
                <option value="protective">Protective</option>
              </select>
            </div>

            {/* AGE & PRICE */}
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Age (e.g. 2 years)" className="p-4 border rounded-xl"
                value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
              <input type="number" placeholder="Price" className="p-4 border rounded-xl"
                value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            </div>

            <textarea required placeholder="Description" rows={4}
              className="w-full p-4 border rounded-xl"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

            {/* PHOTO UPLOAD */}
            <input type="file" accept="image/*" onChange={handleFile} />
            {form.photos.map((p, i) => <img key={i} src={p} alt="" className="h-24 inline mr-2" />)}

            <button type="submit"
              className="w-full py-4 bg-green-600 text-white rounded-full font-bold flex justify-center gap-2">
              <Sparkles /> Create Pet
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
